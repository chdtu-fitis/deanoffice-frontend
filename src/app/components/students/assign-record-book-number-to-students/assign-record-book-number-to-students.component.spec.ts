import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRecordBookNumberToStudentsComponent } from './assign-record-book-number-to-students.component';

describe('AssignRecordBookNumberToStudentsComponent', () => {
  let component: AssignRecordBookNumberToStudentsComponent;
  let fixture: ComponentFixture<AssignRecordBookNumberToStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRecordBookNumberToStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRecordBookNumberToStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
