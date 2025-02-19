import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableButtonComponent } from './draggable-button.component';

describe('DraggableButtonComponent', () => {
  let component: DraggableButtonComponent;
  let fixture: ComponentFixture<DraggableButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraggableButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
