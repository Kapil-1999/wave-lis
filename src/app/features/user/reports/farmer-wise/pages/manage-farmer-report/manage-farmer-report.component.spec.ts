import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFarmerReportComponent } from './manage-farmer-report.component';

describe('ManageFarmerReportComponent', () => {
  let component: ManageFarmerReportComponent;
  let fixture: ComponentFixture<ManageFarmerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageFarmerReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFarmerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
