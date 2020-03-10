import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNameCleaningComponent } from './course-name-cleaning.component';

describe('CourseNameCleaningComponent', () => {
  let component: CourseNameCleaningComponent;
  let fixture: ComponentFixture<CourseNameCleaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNameCleaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNameCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
