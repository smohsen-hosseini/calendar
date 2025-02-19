import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { TimeTableComponent } from '../time-table/time-table.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CalendarComponent, TimeTableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

}
