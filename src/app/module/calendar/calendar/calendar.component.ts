import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateService } from '../../../service/DataService'; // Import DateService
import { MatButtonModule } from '@angular/material/button';
import { CalendarEvent } from '../../../models/CalendarEvent';
import { ScheduleService } from '../../../service/ScheduleService'; // Import DateService

@Component({
  selector: 'app-calendar-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    // MatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() action!: string; // Input property to determine "Create" or "Edit"

  @Input() selectedCalendarEventForUpdate!: CalendarEvent; // Input property to receive the user object

  @Output() appintmentCreated: EventEmitter<CalendarEvent> =
    new EventEmitter<CalendarEvent>();
  @Output() appintmentUpdated: EventEmitter<CalendarEvent> =
    new EventEmitter<CalendarEvent>();

  calendarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dateService: DateService,
    private scheduleService: ScheduleService,
    private readonly cdr: ChangeDetectorRef //todo: check later
  ) {
    this.calendarForm = this.fb.group({
      dateControl: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
      timeControl: ['08:00', Validators.required],
      titleControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.selectedCalendarEventForUpdate) {
      this.updateFormValues();
    }
    this.cdr.detectChanges(); // Force change detection
  }

  onSubmit() {
    if (!this.calendarForm.valid) return;

    const calendarEvent: CalendarEvent = new CalendarEvent();
    calendarEvent.title = this.calendarForm.get('titleControl')?.value; // Get the title value
    calendarEvent.appintmentTime = this.calendarForm.get('timeControl')?.value; // Get the time value
    calendarEvent.appointmentDate = this.calendarForm.get('dateControl')?.value; // Get the date value

    // Combine date and time into a single Date object
    const [hours, minutes] = calendarEvent.appintmentTime
      .split(':')
      .map(Number); // Split time into hours and minutes
    const dateTime = new Date(calendarEvent.appointmentDate); // Create a Date object from the date value
    dateTime.setHours(hours, minutes); // Set the hours and minutes

    // dateTime.setHours(hours); // Set the hours and minutes
    this.dateService.setCalendarEvent(calendarEvent); // Set selected date

    this.dateService.setSelectedDate(dateTime); // Set selected date

    if (this.action.toLowerCase().trim() == 'create') {
      console.log('Calendar Create!!!!!');
    } else if (this.action.toLowerCase().trim() == 'edit') {
      console.log('Calendar Edit!!!!!');
    } else {
      console.log('Calendar Unknown!!!!!');
    }
  }

  updateFormValues(): void {
    if (this.selectedCalendarEventForUpdate) {
      this.calendarForm.patchValue({
        titleControl: this.selectedCalendarEventForUpdate.title || '',
        timeControl: this.selectedCalendarEventForUpdate.appintmentTime || '',
        dateControl: this.selectedCalendarEventForUpdate.appointmentDate || '',
      });
      this.cdr.detectChanges(); // Force change detection (when opening Dialog for Edit Record)
    }
  }

  get dateControl(): FormControl {
    return this.calendarForm.get('dateControl') as FormControl;
  }

  get timeControl(): FormControl {
    return this.calendarForm.get('timeControl') as FormControl;
  }

  get titleControl(): FormControl {
    return this.calendarForm.get('titleControl') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCalendarEventForUpdate']?.currentValue) {
      this.updateFormValues(); // Update form with input data when it changes
    }
  }

  onDelete(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    this.scheduleService.runMethodInTimeTable();
    this.cdr.detectChanges(); // Force change detection if necessary
  }

  renderDeleteButton(): boolean {
    if (this.action.toLowerCase().trim() === 'edit') return true;
    return false;
  }
}
