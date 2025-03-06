import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarEvent } from '../models/CalendarEvent' ;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventsSubject = new BehaviorSubject<Record<string, CalendarEvent[]>>(
    {}
  );
  events$ = this.eventsSubject.asObservable();

  deleteEvent(timeSlot: string, index: number) {
    const events = this.eventsSubject.getValue();
    if (events[timeSlot] && events[timeSlot].length > 0) {
      events[timeSlot].splice(index, 1);
      if (events[timeSlot].length === 0) {
        delete events[timeSlot];
      }
      this.eventsSubject.next({ ...events });
    }
  }

  updateEvents(events: Record<string, CalendarEvent[]>) {
    this.eventsSubject.next(events);
  }
}
