import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentDialogComponent } from './edit-student-dialog.component';

describe('EditStudentDialogComponent', () => {
  let component: EditStudentDialogComponent;
  let fixture: ComponentFixture<EditStudentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStudentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
