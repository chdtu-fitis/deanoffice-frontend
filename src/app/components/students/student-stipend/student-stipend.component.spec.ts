import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStipendComponent } from './student-stipend.component';

describe('StudentStipendComponent', () => {
  let component: StudentStipendComponent;
  let fixture: ComponentFixture<StudentStipendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStipendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStipendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
