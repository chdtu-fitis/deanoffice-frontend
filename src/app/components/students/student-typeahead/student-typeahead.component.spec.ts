import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTypeaheadComponent } from './student-typeahead.component';

describe('StudentTypeaheadComponent', () => {
  let component: StudentTypeaheadComponent;
  let fixture: ComponentFixture<StudentTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentTypeaheadComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
