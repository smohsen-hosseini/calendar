import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarComponent,
    CalendarRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ]
})
export class CalendarModule { }
