import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesForGroupsComponent } from './courses-for-groups.component';

describe('CoursesForGroupsComponent', () => {
  let component: CoursesForGroupsComponent;
  let fixture: ComponentFixture<CoursesForGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ CoursesForGroupsComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesForGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
