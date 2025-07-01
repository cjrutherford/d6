import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D6 } from './d6';

describe('D6', () => {
  let component: D6;
  let fixture: ComponentFixture<D6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
