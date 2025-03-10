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
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() action!: string; // Input property to determine "Create" or "Edit"
  @Input() selectedCalendarEventForUpdate!: CalendarEvent; // Input property to receive the user object
  @Output() appointmentCreated = new EventEmitter<CalendarEvent>();
  @Output() appointmentUpdated = new EventEmitter<CalendarEvent>();

  calendarForm: FormGroup;
  private destroy$ = new Subject<void>();

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
    // this.cdr.detectChanges(); // Force change detection

    this.calendarForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.calendarForm.valid) {
          this.emitAppointmentEvent();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private emitAppointmentEvent(): void {
    const calendarEvent: CalendarEvent = {
      title: this.calendarForm.get('titleControl')?.value,
      appointmentDate: this.calendarForm.get('dateControl')?.value,
      appintmentTime: this.calendarForm.get('timeControl')?.value,
    };

    if (this.action.toLowerCase().trim() === 'create') {
      this.appointmentCreated.emit(calendarEvent);
    } else if (this.action.toLowerCase().trim() === 'edit') {
      this.appointmentUpdated.emit(calendarEvent);
    }
  }

  onSubmit() {
    if (!this.calendarForm.valid) return;

    const calendarEvent: CalendarEvent = new CalendarEvent();
    calendarEvent.title = this.calendarForm.get('titleControl')?.value; // Get the title value
    let timeValue = this.calendarForm.get('timeControl')?.value; // Get the time value

    // Extract only the hour part and set minutes to "00"
    const hours = timeValue.split(':')[0]; // Get only the hours
    timeValue = `${String(hours).padStart(2, '0')}:00`;

    calendarEvent.appintmentTime = timeValue; // Store the HH:00 format
    calendarEvent.appointmentDate = this.calendarForm.get('dateControl')?.value; // Get the date value... // Combine date and time into a single Date object

    const dateTime = new Date(calendarEvent.appointmentDate); // Create a Date object from the date value
    const [hour, minute] = calendarEvent.appintmentTime.split(':').map(Number);
    dateTime.setHours(hour, minute); // Set the hours and minutes

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
    console.log(
      'update form value appointmentTime: ' +
        this.selectedCalendarEventForUpdate.appintmentTime
    );
    console.log(
      'update form value title: ' + this.selectedCalendarEventForUpdate.title
    );

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
