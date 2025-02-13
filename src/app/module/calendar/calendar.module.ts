import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarComponent,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
