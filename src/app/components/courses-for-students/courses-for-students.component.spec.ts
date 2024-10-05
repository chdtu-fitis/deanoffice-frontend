import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesForStudentsComponent } from './courses-for-students.component';

describe('CoursesForStudentsComponent', () => {
  let component: CoursesForStudentsComponent;
  let fixture: ComponentFixture<CoursesForStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesForStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesForStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
