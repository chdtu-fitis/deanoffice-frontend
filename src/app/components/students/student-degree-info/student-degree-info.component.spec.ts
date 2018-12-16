import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDegreeInfoComponent } from './student-degree-info.component';

describe('StudentDegreeInfoComponent', (): void => {
  let component: StudentDegreeInfoComponent;
  let fixture: ComponentFixture<StudentDegreeInfoComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentDegreeInfoComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentDegreeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
