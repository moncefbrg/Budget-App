import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensesPage } from './depenses-page';

describe('DepensesPage', () => {
  let component: DepensesPage;
  let fixture: ComponentFixture<DepensesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepensesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepensesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
