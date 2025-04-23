import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAcquisitionComponent } from './manage-acquisition.component';

describe('ManageAcquisitionComponent', () => {
  let component: ManageAcquisitionComponent;
  let fixture: ComponentFixture<ManageAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAcquisitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
