import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private runMethodSubject = new Subject<void>();
  runMethod$ = this.runMethodSubject.asObservable();

  runMethodInTimeTable(): void {
    this.runMethodSubject.next();
  }
}
