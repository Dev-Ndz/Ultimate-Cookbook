import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePictureDialogComponent } from './choose-picture-dialog.component';

describe('ChoosePictureDialogComponent', () => {
  let component: ChoosePictureDialogComponent;
  let fixture: ComponentFixture<ChoosePictureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePictureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoosePictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
