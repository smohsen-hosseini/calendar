import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentDialogComponent } from '../calendar/appointment-dialog/appointment-dialog.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CalendarComponent,
    CalendarRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatButtonModule,
    AppointmentDialogComponent,
    DragDropModule, // Add this line
  ],
})
export class CalendarModule {}
