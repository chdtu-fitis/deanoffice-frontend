import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveCourseFormComponent } from './selective-course-form.component';

describe('SelectiveCourseFormComponent', () => {
  let component: SelectiveCourseFormComponent;
  let fixture: ComponentFixture<SelectiveCourseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectiveCourseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
