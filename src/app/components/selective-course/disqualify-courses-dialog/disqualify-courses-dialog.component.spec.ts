import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisqualifyCoursesDialogComponent } from './disqualify-courses-dialog.component';

describe('DisqualifyCoursesDialogComponent', () => {
  let component: DisqualifyCoursesDialogComponent;
  let fixture: ComponentFixture<DisqualifyCoursesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisqualifyCoursesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisqualifyCoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
