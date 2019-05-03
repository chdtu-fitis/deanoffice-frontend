import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSpecializationTransferComponent } from './student-specialization-transfer.component';

describe('StudentSpecializationTransferComponent', () => {
  let component: StudentSpecializationTransferComponent;
  let fixture: ComponentFixture<StudentSpecializationTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSpecializationTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSpecializationTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
