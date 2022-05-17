import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesByGroupComponent } from './courses-by-group.component';

describe('CoursesByGroupComponent', () => {
  let component: CoursesByGroupComponent;
  let fixture: ComponentFixture<CoursesByGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesByGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
