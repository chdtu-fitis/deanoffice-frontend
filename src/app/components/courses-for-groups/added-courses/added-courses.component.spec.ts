import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedCoursesComponent } from './added-courses.component';

describe('AddedCoursesComponent', () => {
  let component: AddedCoursesComponent;
  let fixture: ComponentFixture<AddedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ AddedCoursesComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
