import { TestBed } from '@angular/core/testing';

import { KhasraService } from './khasra.service';

describe('KhasraService', () => {
  let service: KhasraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhasraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
