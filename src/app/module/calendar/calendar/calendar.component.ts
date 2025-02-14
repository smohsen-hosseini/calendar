import {ChangeDetectionStrategy, Component,OnInit  } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule,FormControl  } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
// import { MaterialTimePickerComponent } from '@candidosales/material-time-picker'; //third-party-library

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    // MaterialTimePickerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  calendarForm: FormGroup;



  constructor(private fb: FormBuilder) {
    this.calendarForm = this.fb.group({
      dateControl: [new Date(), Validators.required],
      timeControl: ['', Validators.required],
    });
  }

  // dateControl = new FormControl(new Date());
  // date: Date = new Date();

  // timeControl = new FormControl('');

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.calendarForm.valid) {
      console.log(this.calendarForm.value);
    }
  }

  
  get dateControl(): FormControl {
    return this.calendarForm.get('dateControl') as FormControl;
  }

  get timeControl(): FormControl {
    return this.calendarForm.get('timeControl') as FormControl;
  }
  
}
