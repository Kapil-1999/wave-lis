import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerReportListComponent } from './farmer-report-list.component';

describe('FarmerReportListComponent', () => {
  let component: FarmerReportListComponent;
  let fixture: ComponentFixture<FarmerReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerReportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
