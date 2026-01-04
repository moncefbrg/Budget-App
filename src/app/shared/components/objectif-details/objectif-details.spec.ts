import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectifDetails } from './objectif-details';

describe('ObjectifDetails', () => {
  let component: ObjectifDetails;
  let fixture: ComponentFixture<ObjectifDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectifDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectifDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
