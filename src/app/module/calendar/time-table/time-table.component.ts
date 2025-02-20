import { Component, OnInit  } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, CdkDragEnd,transferArrayItem ,DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DraggableButtonComponent } from '../draggable-button/draggable-button.component'
import { DateService } from '../../../service/DataService'; // Import DateService
import { Subscription } from 'rxjs';  //Import Subscription

interface CalendarEvent  {
  title: string;
  start: Date;
  end: Date;
}

@Component({
  selector: 'time-table',
  standalone: true,
  imports: [CommonModule, MatCardModule, DraggableButtonComponent, CdkDrag, DragDropModule],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent implements OnInit {

  selectedDay: Date = new Date(); // Initialize with the current date

  timeSlots: string[] = [];

  calendarEvents: { [timeSlot: string]: CalendarEvent[] } = {};

  private dateSubscription: Subscription | undefined;  //Define Subscription

  draggableButtons: { title: string }[] = [{ title: 'Button 1' }, { title: 'Button 2' }]; // Sample draggable buttons

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => { // Subscribe to selectedDate$
      this.selectedDay = date; // Update selectedDay
  });

    this.generateTimeSlots();
    this.loadCalendarEvents();
  }

  ngOnDestroy(): void {  //Implement OnDestroy
    if (this.dateSubscription) {
        this.dateSubscription.unsubscribe();  //Unsubscribe
    }
  }

  generateTimeSlots() {
    let currentTime = new Date();
    currentTime.setHours(8, 0, 0, 0); // Start at 8 AM

    const endTime = new Date();
    endTime.setHours(19, 0, 0, 0); // End at 6 PM

    while (currentTime < endTime) {
      const timeSlot = this.formatTime(currentTime);
      this.timeSlots.push(timeSlot);
      if (!this.calendarEvents[timeSlot]) {
        this.calendarEvents[timeSlot] = []; // Initialize empty calendarEvents list for each time slot
      }
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by half an hour
    }
  }


  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  loadCalendarEvents() {
    // Sample events
    this.calendarEvents['09:00'] = [{ title: 'Meeting', start: new Date('2025-02-14T09:00:00'), end: new Date('2025-02-14T10:00:00') }];
    this.calendarEvents['12:00'] = [{ title: 'Lunch', start: new Date('2025-02-14T12:00:00'), end: new Date('2025-02-14T13:00:00') }];
    this.calendarEvents['15:00'] = [{ title: 'Conference', start: new Date('2025-02-14T15:00:00'), end: new Date('2025-02-14T16:30:00') }];
  }


  getEventsForSlot(timeSlot: string): CalendarEvent[] {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startTime = new Date(this.selectedDay);
    startTime.setHours(hours, minutes, 0, 0);

    return this.calendarEvents[timeSlot] || []; //Return empty array if timeslot is not found
  }

    // Method to change the selected day (you can bind this to a datepicker or buttons)
  selectDay(day: Date) {
      this.selectedDay = day;
  }


  onDrop(event: CdkDragDrop<CalendarEvent[]>, timeSlot: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
