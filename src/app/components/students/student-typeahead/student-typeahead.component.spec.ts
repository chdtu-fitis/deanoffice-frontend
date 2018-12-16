import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTypeaheadComponent } from './student-typeahead.component';

describe('StudentTypeaheadComponent', (): void => {
  let component: StudentTypeaheadComponent;
  let fixture: ComponentFixture<StudentTypeaheadComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentTypeaheadComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
