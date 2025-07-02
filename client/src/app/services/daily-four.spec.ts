import { TestBed } from '@angular/core/testing';

import { DailyFour } from './daily-four';

describe('DailyFour', () => {
  let service: DailyFour;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyFour);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
