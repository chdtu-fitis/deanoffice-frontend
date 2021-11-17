import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { AddCoursesForStudentsComponent } from './add-courses-for-students.component';

describe('EditStudentDialogComponent', () => {
  let component: AddCoursesForStudentsComponent;
  let fixture: ComponentFixture<AddCoursesForStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoursesForStudentsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursesForStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
