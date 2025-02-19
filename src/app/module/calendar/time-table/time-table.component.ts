import { Component, OnInit  } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog'; // For event creation/editing
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

interface Event {
  title: string;
  start: Date;
  end: Date;
}

@Component({
  selector: 'time-table',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent implements OnInit {

  days: Date[] = [];
  timeSlots: string[] = [];
  events: Event[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
    this.generateTimeSlots();
    this.loadEvents();
  }

  generateCalendar() {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Get the first day of the week (Sunday)

    for (let i = 0; i < 7; i++) {
      this.days.push(new Date(startOfWeek)); // Create a new Date object for each day
      startOfWeek.setDate(startOfWeek.getDate() + 1); // Increment the day
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

  getEventsForSlot(day: Date, timeSlot: string): Event[] {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startTime = new Date(day);
    startTime.setHours(hours, minutes, 0, 0);

    return this.events.filter(event => {
      return startTime >= event.start && startTime < event.end;
    });
  }

}
