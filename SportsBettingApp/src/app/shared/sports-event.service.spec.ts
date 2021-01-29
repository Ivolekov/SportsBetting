import { TestBed } from '@angular/core/testing';

import { SportsEventService } from './sports-event.service';

describe('SportsEventService', () => {
  let service: SportsEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
