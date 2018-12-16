import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRecordBookNumberToStudentsComponent } from './assign-record-book-number-to-students.component';

describe('AssignRecordBookNumberToStudentsComponent', (): void => {
  let component: AssignRecordBookNumberToStudentsComponent;
  let fixture: ComponentFixture<AssignRecordBookNumberToStudentsComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ AssignRecordBookNumberToStudentsComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(AssignRecordBookNumberToStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
