import { TestBed } from '@angular/core/testing';

import { DailySix } from './daily-six';

describe('DailySix', () => {
  let service: DailySix;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailySix);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
