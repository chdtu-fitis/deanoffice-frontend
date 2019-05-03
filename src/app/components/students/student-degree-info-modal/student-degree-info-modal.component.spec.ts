import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDegreeInfoModalComponent } from './student-degree-info-modal.component';

describe('StudentDegreeInfoModalComponent', () => {
  let component: StudentDegreeInfoModalComponent;
  let fixture: ComponentFixture<StudentDegreeInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDegreeInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDegreeInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
