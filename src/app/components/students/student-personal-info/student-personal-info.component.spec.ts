import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalInfoComponent } from './student-personal-info.component';

describe('StudentPersonalInfoComponent', () => {
  let component: StudentPersonalInfoComponent;
  let fixture: ComponentFixture<StudentPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StudentPersonalInfoComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
