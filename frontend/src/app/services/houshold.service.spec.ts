import { TestBed } from '@angular/core/testing';

import { HouseholdService } from './household.service';

describe('HousholdService', () => {
  let service: HouseholdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseholdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
