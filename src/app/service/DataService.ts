import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../models/CalendarEvent';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private selectedCalendarEventSource = new BehaviorSubject<CalendarEvent>(
    new CalendarEvent()
  ); // Initialization
  selectedCalendarEvent$ = this.selectedCalendarEventSource.asObservable();

  setCalendarEvent(calendarEvent: CalendarEvent) {
    this.selectedCalendarEventSource.next(calendarEvent);
  }

  private selectedDateSource = new BehaviorSubject<Date>(new Date()); // Initial date
  selectedDate$ = this.selectedDateSource.asObservable();

  setSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }


}
