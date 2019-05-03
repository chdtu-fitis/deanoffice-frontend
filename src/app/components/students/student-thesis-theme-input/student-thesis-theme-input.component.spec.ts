import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThesisThemeInputComponent } from './student-thesis-theme-input.component';

describe('StudentThesisThemeInputComponent', () => {
  let component: StudentThesisThemeInputComponent;
  let fixture: ComponentFixture<StudentThesisThemeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentThesisThemeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentThesisThemeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
