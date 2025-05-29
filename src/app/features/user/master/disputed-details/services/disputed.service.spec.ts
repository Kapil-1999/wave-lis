import { TestBed } from '@angular/core/testing';

import { DisputedService } from './disputed.service';

describe('DisputedService', () => {
  let service: DisputedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisputedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
