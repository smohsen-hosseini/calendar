import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-draggable-button',
  standalone: true,
  imports: [],
  templateUrl: './draggable-button.component.html',
  styleUrl: './draggable-button.component.css'
})
export class DraggableButtonComponent {

  @Input() title: string = 'Drag Me';
  
}
