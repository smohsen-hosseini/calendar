import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../models/CalendarEvent';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private selectedCalendarEventSource = new BehaviorSubject<CalendarEvent>(
    new CalendarEvent()
  );
  selectedCalendarEvent$ = this.selectedCalendarEventSource.asObservable();

  private selectedDateSource = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSource.asObservable();

  setCalendarEvent(calendarEvent: CalendarEvent): void {
    this.selectedCalendarEventSource.next(calendarEvent);
  }

  setSelectedDate(date: Date): void {
    this.selectedDateSource.next(date);
  }
}
