import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiedCoursesComponent } from './studied-courses.component';

describe('StudiedCoursesComponent', () => {
  let component: StudiedCoursesComponent;
  let fixture: ComponentFixture<StudiedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudiedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
