import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDegreeInfoComponent } from './student-degree-info.component';

describe('StudentDegreeInfoComponent', () => {
  let component: StudentDegreeInfoComponent;
  let fixture: ComponentFixture<StudentDegreeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentDegreeInfoComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDegreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
