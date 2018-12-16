import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalInfoComponent } from './student-personal-info.component';

describe('StudentPersonalInfoComponent', (): void => {
  let component: StudentPersonalInfoComponent;
  let fixture: ComponentFixture<StudentPersonalInfoComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentPersonalInfoComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
