import { Component, OnInit  } from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray, CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DraggableButtonComponent } from '../draggable-button/draggable-button.component'
import { DateService } from '../../../service/DataService'; // Import DateService
import { Subscription } from 'rxjs';  //Import Subscription

interface Event {
  title: string;
  start: Date;
  end: Date;
}

@Component({
  selector: 'time-table',
  standalone: true,
  imports: [CommonModule, MatCardModule, DraggableButtonComponent, CdkDrag],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent implements OnInit {

  selectedDay: Date = new Date(); // Initialize with the current date

  timeSlots: string[] = [];
  events: Event[] = [];  
  private dateSubscription: Subscription | undefined;  //Define Subscription

  draggableButtons: { title: string }[] = [{ title: 'Button 1' }, { title: 'Button 2' }]; // Sample draggable buttons

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => { // Subscribe to selectedDate$
      this.selectedDay = date; // Update selectedDay
  });

    this.generateTimeSlots();
    this.loadEvents();
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
      this.timeSlots.push(this.formatTime(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 30); // Increment by half an hour
    }
  }


  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  loadEvents() {
    // Sample events
    this.events = [
      { title: 'Meeting', start: new Date('2025-02-14T09:00:00'), end: new Date('2025-02-14T10:00:00') },
      { title: 'Lunch', start: new Date('2025-02-14T12:00:00'), end: new Date('2025-02-14T13:00:00') },
      { title: 'Conference', start: new Date('2025-02-14T15:00:00'), end: new Date('2025-02-14T16:30:00') }
    ];
  }


  getEventsForSlot(timeSlot: string): Event[] {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startTime = new Date(this.selectedDay);
    startTime.setHours(hours, minutes, 0, 0);

    return this.events.filter(event => {
        return startTime >= event.start && startTime < event.end;
    });
  }

      // Method to change the selected day (you can bind this to a datepicker or buttons)
    selectDay(day: Date) {
        this.selectedDay = day;
    }


}
