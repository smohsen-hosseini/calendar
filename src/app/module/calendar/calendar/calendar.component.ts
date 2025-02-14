import {ChangeDetectionStrategy, Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule,FormControl  } from '@angular/forms';
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
export class CalendarComponent {



  dateControl = new FormControl(new Date());
  date: Date = new Date();


}
