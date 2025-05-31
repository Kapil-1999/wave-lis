import { TestBed } from '@angular/core/testing';

import { KhasraFarmerService } from './khasra-farmer.service';

describe('KhasraFarmerService', () => {
  let service: KhasraFarmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhasraFarmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
