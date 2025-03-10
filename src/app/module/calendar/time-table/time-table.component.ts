import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DateService } from '../../../service/DataService'; // Import DateService
import { EventService } from '../../../service/EventService'; // Import DateService
import { ScheduleService } from '../../../service/ScheduleService'; // Import DateService
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { CalendarEvent } from '../../../models/CalendarEvent';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [CommonModule, MatCardModule, CdkDrag, DragDropModule],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css',
})
export class TimeTableComponent implements OnInit, OnDestroy {
  selectedCalendarEvent: CalendarEvent = new CalendarEvent();

  timeSlots: string[] = [];
  connectedDropLists: string[] = []; // Initialize as an empty array

  selectedTimeSlot = '';
  selectedIndex = 0;

  calendarEvents: Record<string, CalendarEvent[]> = {};
  private destroy$ = new Subject<void>();

  constructor(
    private dateService: DateService,
    private eventService: EventService,
    private scheduleService: ScheduleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dateService.selectedCalendarEvent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((calendarEvent) => {
        this.selectedCalendarEvent = calendarEvent; // Update calendarEvent
        this.loadCalendarEvents();
      });

    this.eventService.events$
      .pipe(takeUntil(this.destroy$))
      .subscribe((events) => {
        this.calendarEvents = events;
      });

    this.scheduleService.runMethod$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.deleteEvent(this.selectedTimeSlot, this.selectedIndex);
      });

    this.generateTimeSlots();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generateTimeSlots() {
    this.timeSlots = []; // Clear existing time slots
    this.connectedDropLists = []; // Clear existing connected drop lists

    for (let hour = 0; hour < 24; hour++) {
      const timeSlot = this.formatTime(new Date(0, 0, 0, hour)); // Create a date object for each hour
      this.timeSlots.push(timeSlot); // Add the formatted time slot
      this.connectedDropLists.push(timeSlot); // Add each time slot to connectedDropLists

      // Initialize empty calendarEvents list for each time slot
      if (!this.calendarEvents[timeSlot]) {
        this.calendarEvents[timeSlot] = [];
      }
    }
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // loadCalendarEvents() {
  //   // Sample events
  //   this.calendarEvents['09:00'] = [{ title: 'Meeting', start: new Date('2025-02-14T09:00:00'), end: new Date('2025-02-14T10:00:00') }];
  //   this.calendarEvents['12:00'] = [{ title: 'Lunch', start: new Date('2025-02-14T12:00:00'), end: new Date('2025-02-14T13:00:00') }];
  //   this.calendarEvents['15:00'] = [{ title: 'Conference', start: new Date('2025-02-14T15:00:00'), end: new Date('2025-02-14T16:30:00') }];
  // }

  loadCalendarEvents() {
    // Clear existing events
    this.calendarEvents = {};

    // Generate time slots if not already generated
    if (this.timeSlots.length === 0) {
      this.generateTimeSlots();
    }

    const title = this.selectedCalendarEvent.title;
    const appointmentDate = this.selectedCalendarEvent.appointmentDate;
    const appintmentTime = this.selectedCalendarEvent.appintmentTime;

    // Format start time to match a time slot (e.g., "09:00")
    const formattedTimeSlot = appintmentTime;

    // Add this event to its corresponding time slot in calendarEvents
    this.calendarEvents[formattedTimeSlot] = [
      {
        title: title, // Example title
        appointmentDate: appointmentDate,
        appintmentTime: appintmentTime,
      },
    ];
  }

  getEventsForSlot(timeSlot: string): CalendarEvent[] {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startTime = new Date(this.selectedCalendarEvent.appointmentDate);
    startTime.setHours(hours, minutes, 0, 0);

    return this.calendarEvents[timeSlot] || []; //Return empty array if timeslot is not found
  }

  onDrop(event: CdkDragDrop<CalendarEvent[]>, timeSlot: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const previousTimeSlot = event.previousContainer.id;
      const movedEvent = this.calendarEvents[previousTimeSlot].splice(
        event.previousIndex,
        1
      )[0];
      movedEvent.appintmentTime = timeSlot;

      if (!this.calendarEvents[timeSlot]) {
        this.calendarEvents[timeSlot] = [];
      }
      this.calendarEvents[timeSlot].splice(event.currentIndex, 0, movedEvent);
      this.eventService.updateEvents(this.calendarEvents);
    }
  }

  deleteEvent(timeSlot: string, index: number): void {
    if (
      this.calendarEvents[timeSlot] &&
      this.calendarEvents[timeSlot].length > 0
    ) {
      this.calendarEvents[timeSlot].splice(index, 1);
      if (this.calendarEvents[timeSlot].length === 0) {
        delete this.calendarEvents[timeSlot];
      }
      this.eventService.updateEvents(this.calendarEvents);
    }
  }

  selectEvent(
    calendarEvent: CalendarEvent,
    timeSlot: string,
    index: number
  ): void {
    this.selectedTimeSlot = timeSlot;
    this.selectedIndex = index;
    this.openDialog(calendarEvent, this.selectedTimeSlot, this.selectedIndex);
  }

  openDialog(
    calendarEvent: CalendarEvent,
    timeSlot: string,
    index: number
  ): void {
    console.log(
      'openDialog timeTable, appintmentTime:  ' + calendarEvent.appintmentTime
    );
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '60vw',
      height: '50vh',
      data: calendarEvent,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.deleteEvent(timeSlot, index);
      }
    });
  }
}
