import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCoursesComponent } from './assigned-courses.component';

describe('AssignedCoursesComponent', () => {
  let component: AssignedCoursesComponent;
  let fixture: ComponentFixture<AssignedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
