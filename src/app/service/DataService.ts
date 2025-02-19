import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDateSource = new BehaviorSubject<Date>(new Date()); // Initial date
  selectedDate$ = this.selectedDateSource.asObservable();

  constructor() { }

  setSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }
}
