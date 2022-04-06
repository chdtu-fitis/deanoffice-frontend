import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSelectedCoursesOfStudentsComponent } from './show-selected-courses-of-students.component';

describe('ShowSelectedCoursesOfStudentsComponent', () => {
  let component: ShowSelectedCoursesOfStudentsComponent;
  let fixture: ComponentFixture<ShowSelectedCoursesOfStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSelectedCoursesOfStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSelectedCoursesOfStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
