import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDateSource = new BehaviorSubject<Date>(new Date()); // Initial date
  selectedDate$ = this.selectedDateSource.asObservable();


    // New code for title
    private titleSource = new BehaviorSubject<string>('Default Title'); // Initial title
    title$ = this.titleSource.asObservable();


  setSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }

  setTitle(title: string) {
    console.log(title+ ">>>>>>>>> setTitle >>>>>>>>>>")
    this.titleSource.next(title);
  }

}
