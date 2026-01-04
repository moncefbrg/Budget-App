import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieProgress } from './pie-progress';

describe('PieProgress', () => {
  let component: PieProgress;
  let fixture: ComponentFixture<PieProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
