import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopAcademicVacationComponent } from './stop-academic-vacation.component';

describe('StopAcademicVacationComponent', (): void => {
  let component: StopAcademicVacationComponent;
  let fixture: ComponentFixture<StopAcademicVacationComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ StopAcademicVacationComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(StopAcademicVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
