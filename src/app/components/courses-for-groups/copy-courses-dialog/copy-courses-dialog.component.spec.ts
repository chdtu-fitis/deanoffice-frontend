import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyCoursesDialogComponent } from './copy-courses-dialog.component';

describe('CopyCoursesDialogComponent', () => {
  let component: CopyCoursesDialogComponent;
  let fixture: ComponentFixture<CopyCoursesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ CopyCoursesDialogComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyCoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
