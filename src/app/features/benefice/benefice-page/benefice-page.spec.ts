import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficePage } from './benefice-page';

describe('BeneficePage', () => {
  let component: BeneficePage;
  let fixture: ComponentFixture<BeneficePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
