import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAcademicVacationComponent } from './student-academic-vacation.component';

describe('StudentAcademicVacationComponent', () => {
  let component: StudentAcademicVacationComponent;
  let fixture: ComponentFixture<StudentAcademicVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentAcademicVacationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAcademicVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
