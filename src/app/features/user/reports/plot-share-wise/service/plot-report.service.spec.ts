import { TestBed } from '@angular/core/testing';

import { PlotReportService } from './plot-report.service';

describe('PlotReportService', () => {
  let service: PlotReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
