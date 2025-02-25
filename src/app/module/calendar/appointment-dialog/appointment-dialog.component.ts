import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule ,} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface AppointmentDialogData {
  startTime: Date;
  endTime: Date;
}

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [
    MatDialogModule, // Import MatDialogModule
    FormsModule,     // Import FormsModule for form handling
    ReactiveFormsModule // Import ReactiveFormsModule for reactive forms
  ],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.css'
})

export class AppointmentDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentDialogData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      startTime: [data.startTime, Validators.required],
      endTime: [data.endTime, Validators.required],
      description: ['']


    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        title: this.form.value.title,
        startTime: new Date(this.form.value.startTime),
        endTime: new Date(this.form.value.endTime),
        description: this.form.value.description
      });
    }
  }

  

}
