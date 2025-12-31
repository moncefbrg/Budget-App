import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSubmit } from './input-submit';

describe('InputSubmit', () => {
  let component: InputSubmit;
  let fixture: ComponentFixture<InputSubmit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSubmit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSubmit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
