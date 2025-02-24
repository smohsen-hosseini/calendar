import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { ScheduleComponent } from './schedule/schedule.component';


const routes: Routes = [

  {
    path: '',
    component: ScheduleComponent,
  },
  {
    path: '1',
    component: CalendarComponent,
  },
  {
    path: 'time-table',
    component: TimeTableComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
