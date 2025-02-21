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
  connectedDropLists: string[] = []; // Initialize as an empty array

  calendarEvents: { [timeSlot: string]: CalendarEvent[] } = {};

  private dateSubscription: Subscription | undefined;  //Define Subscription

  draggableButtons: { title: string }[] = [{ title: 'Button 1' }, { title: 'Button 2' }]; // Sample draggable buttons

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => { // Subscribe to selectedDate$
      this.selectedDay = date; // Update selectedDay
      this.loadCalendarEvents();
    });

    this.generateTimeSlots();
    this.loadCalendarEvents();
  }

  ngOnDestroy(): void {  //Implement OnDestroy
    if (this.dateSubscription) {
        this.dateSubscription.unsubscribe();  //Unsubscribe
    }
  }

  // generateTimeSlots() {
  //   let currentTime = new Date();
  //   currentTime.setHours(8, 0, 0, 0); // Start at 8 AM

  //   const endTime = new Date();
  //   endTime.setHours(19, 0, 0, 0); // End at 6 PM

  //   while (currentTime < endTime) {
  //     const timeSlot = this.formatTime(currentTime);
  //     this.timeSlots.push(timeSlot);
  //     this.connectedDropLists.push(timeSlot); // Add each time slot to connectedDropLists
  //     if (!this.calendarEvents[timeSlot]) {
  //       this.calendarEvents[timeSlot] = []; // Initialize empty calendarEvents list for each time slot
  //     }
  //     currentTime.setMinutes(currentTime.getMinutes() + 60); // Increment by an Hour(+ 60) or half an hour (+ 30)

  //   }
  // }

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

    // Use selectedDay as the base for the event's start time
    const startTime = new Date(this.selectedDay); // Get date and time from selectedDay

    // Create an end time one hour later
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1); // Set end time to one hour later

    // Format start time to match a time slot (e.g., "09:00")
    const formattedTimeSlot = this.formatTime(startTime);

    // Add this event to its corresponding time slot in calendarEvents
    this.calendarEvents[formattedTimeSlot] = [{
        title: 'Event on Selected Day', // Example title
        start: startTime,
        end: endTime
    }];

    console.log('Loaded Calendar Events:', this.calendarEvents); // Debugging log
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
    console.log('Previous Container:', event.previousContainer.id);
    console.log('Current Container:', event.container.id);
    console.log('Event Data:', event.item.data);

    if (event.previousContainer === event.container) {
        // Move within the same time slot
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        // Move from one time slot to another
        const previousTimeSlot = event.previousContainer.id; // Get the previous time slot ID
        const previousEvents = this.calendarEvents[previousTimeSlot]; // Get events from previous time slot

        // Check if there are any events in the previous time slot
        if (previousEvents && previousEvents.length > 0) {
            const movedEvent = previousEvents.splice(event.previousIndex, 1)[0]; // Remove the event from the previous slot

            // Ensure the target time slot exists in calendarEvents
            if (!this.calendarEvents[timeSlot]) {
                this.calendarEvents[timeSlot] = []; // Initialize if it doesn't exist
            }

            // Add it to the new time slot
            this.calendarEvents[timeSlot].splice(event.currentIndex, 0, movedEvent);

            // Reassign calendarEvents to trigger change detection
            this.calendarEvents = { ...this.calendarEvents };
        }
    }
}


}
