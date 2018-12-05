import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInVacationComponent } from './students-in-vacation.component';

describe('StudentsInVacationComponent', () => {
  let component: StudentsInVacationComponent;
  let fixture: ComponentFixture<StudentsInVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentsInVacationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsInVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
