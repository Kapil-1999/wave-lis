import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlotReportComponent } from './manage-plot-report.component';

describe('ManagePlotReportComponent', () => {
  let component: ManagePlotReportComponent;
  let fixture: ComponentFixture<ManagePlotReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePlotReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePlotReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
