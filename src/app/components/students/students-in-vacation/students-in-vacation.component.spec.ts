import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInVacationComponent } from './students-in-vacation.component';

describe('StudentsInVacationComponent', (): void => {
  let component: StudentsInVacationComponent;
  let fixture: ComponentFixture<StudentsInVacationComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StudentsInVacationComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StudentsInVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
