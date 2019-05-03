import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDegreeHistoryComponent } from './student-degree-history.component';

describe('StudentDegreeHistoryComponent', () => {
  let component: StudentDegreeHistoryComponent;
  let fixture: ComponentFixture<StudentDegreeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDegreeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDegreeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
