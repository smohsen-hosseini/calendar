import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // For event creation/editing
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
//import * as moment from 'moment';
import moment from 'moment';

interface Event {
  title: string;
  start: moment.Moment;
  end: moment.Moment;
}

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './time-table.component.html',
  styleUrl: './time-table.component.css'
})
export class TimeTableComponent implements OnInit {

  days: moment.Moment[] = [];
  timeSlots: string[] = [];
  events: Event[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
    this.generateTimeSlots();
    this.loadEvents();
  }

  generateCalendar() {
    const startOfWeek = moment().startOf('week');
    for (let i = 0; i < 7; i++) {
      this.days.push(moment(startOfWeek).add(i, 'days'));
    }
  }

  generateTimeSlots() {
    let currentTime = moment().startOf('day').hour(8); // Start at 8 AM
    const endTime = moment().startOf('day').hour(18); // End at 6 PM
    while (currentTime.isBefore(endTime)) {
      this.timeSlots.push(currentTime.format('HH:mm'));
      currentTime.add(30, 'minutes'); // Increment by half an hour
    }
  }

  loadEvents() {
    // Sample events
    this.events = [
      { title: 'Meeting', start: moment('2025-02-14T09:00'), end: moment('2025-02-14T10:00') },
      { title: 'Lunch', start: moment('2025-02-14T12:00'), end: moment('2025-02-14T13:00') },
      { title: 'Conference', start: moment('2025-02-14T15:00'), end: moment('2025-02-14T16:30') }
    ];
  }

  getEventsForSlot(day: moment.Moment, timeSlot: string): Event[] {
    const startTime = moment(`${day.format('YYYY-MM-DD')}T${timeSlot}`);
    return this.events.filter(event => 
      startTime.isBetween(event.start, event.end, null, '[]')
    );
  }
}
