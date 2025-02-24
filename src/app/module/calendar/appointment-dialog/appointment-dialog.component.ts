import { Component} from '@angular/core';
// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.css'
})
export class AppointmentDialogComponent {

//   form: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<AppointmentDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder
//   ) {
//     this.form = this.fb.group({
//       title: ['', Validators.required],
//       startTime: [data.startTime.toDate(), Validators.required], 
//       endTime: [data.endTime.toDate(), Validators.required],     
//       description: ['']
//     });
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

 
//   onSubmit(): void {
//     if (this.form.valid) {
//       this.dialogRef.close({
//         title: this.form.value.title,
//         startTime: new Date(this.form.value.startTime), // Use Date object
//         endTime: new Date(this.form.value.endTime),     // Use Date object
//         description: this.form.value.description
//       });
//     }
// }

}
