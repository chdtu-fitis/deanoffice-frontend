import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopAcademicVacationComponent } from './renew-student.component';

describe('StopAcademicVacationComponent', () => {
  let component: StopAcademicVacationComponent;
  let fixture: ComponentFixture<StopAcademicVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ StopAcademicVacationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopAcademicVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
