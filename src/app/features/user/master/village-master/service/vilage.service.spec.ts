import { TestBed } from '@angular/core/testing';

import { VilageService } from './vilage.service';

describe('VilageService', () => {
  let service: VilageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VilageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
