import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThesisThemeInputComponent } from './student-thesis-theme-input.component';

describe('StudentThesisThemeInputComponent', (): void => {
  let component: StudentThesisThemeInputComponent;
  let fixture: ComponentFixture<StudentThesisThemeInputComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentThesisThemeInputComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentThesisThemeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
