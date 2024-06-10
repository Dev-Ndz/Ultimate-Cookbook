import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPlanningComponent } from './add-to-planning.component';

describe('AddToPlanningComponent', () => {
  let component: AddToPlanningComponent;
  let fixture: ComponentFixture<AddToPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToPlanningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
