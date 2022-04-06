import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsStatisticsOfSelectiveCoursesComponent } from './students-statistics-of-selective-courses.component';

describe('StudentsStatisticsOfSelectiveCoursesComponent', () => {
  let component: StudentsStatisticsOfSelectiveCoursesComponent;
  let fixture: ComponentFixture<StudentsStatisticsOfSelectiveCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsStatisticsOfSelectiveCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsStatisticsOfSelectiveCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
