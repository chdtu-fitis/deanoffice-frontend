import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewStudentComponent } from './renew-student.component';

describe('RenewStudentComponent', (): void => {
  let component: RenewStudentComponent;
  let fixture: ComponentFixture<RenewStudentComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({ declarations: [ RenewStudentComponent ] })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(RenewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', (): void => {
    expect(component).toBeTruthy();
  });
});
