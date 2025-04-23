import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotReportListComponent } from './plot-report-list.component';

describe('PlotReportListComponent', () => {
  let component: PlotReportListComponent;
  let fixture: ComponentFixture<PlotReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotReportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
