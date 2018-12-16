import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAcademicVacationComponent } from './student-academic-vacation.component';

describe('StudentAcademicVacationComponent', (): void => {
  let component: StudentAcademicVacationComponent;
  let fixture: ComponentFixture<StudentAcademicVacationComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentAcademicVacationComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentAcademicVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
