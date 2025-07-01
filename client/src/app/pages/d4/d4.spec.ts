import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D4 } from './d4';

describe('D4', () => {
  let component: D4;
  let fixture: ComponentFixture<D4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
