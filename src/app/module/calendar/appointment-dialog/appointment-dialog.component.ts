import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ScheduleService } from '../../../service/ScheduleService'; // Import DateService

export interface AppointmentDialogData {
  startTime: Date;
  endTime: Date;
  title: string;
}

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, // Import MatDialogModule
    FormsModule, // Import FormsModule for form handling
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.css',
})
export class AppointmentDialogComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentDialogData,
    private fb: FormBuilder,
    private scheduleService: ScheduleService
  ) {
    this.appointmentForm = this.fb.group({
      // startTime: [data.startTime, Validators.required],
      // endTime: [data.endTime, Validators.required],
      title: ['', Validators.required],
      // description: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close({
        title: this.appointmentForm.value.title,
        startTime: new Date(this.appointmentForm.value.startTime),
        endTime: new Date(this.appointmentForm.value.endTime),
        description: this.appointmentForm.value.description,
      });
    }
  }

  onDelete(): void {
    this.scheduleService.runMethodInTimeTable();
    this.dialogRef.close({ action: 'delete' });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
