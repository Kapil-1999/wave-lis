import { TestBed } from '@angular/core/testing';

import { VillageReportService } from './village-report.service';

describe('VillageReportService', () => {
  let service: VillageReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillageReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
