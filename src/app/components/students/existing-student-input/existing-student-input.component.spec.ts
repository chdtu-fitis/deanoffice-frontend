import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingStudentInputComponent } from './existing-student-input.component';

describe('ExistingStudentInputComponent', () => {
  let component: ExistingStudentInputComponent;
  let fixture: ComponentFixture<ExistingStudentInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingStudentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingStudentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
