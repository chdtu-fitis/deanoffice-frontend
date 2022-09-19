import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveCoursesComponent } from './selective-courses.component';

describe('ShowSelectedCoursesOfStudentsComponent', () => {
  let component: SelectiveCoursesComponent;
  let fixture: ComponentFixture<SelectiveCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiveCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
