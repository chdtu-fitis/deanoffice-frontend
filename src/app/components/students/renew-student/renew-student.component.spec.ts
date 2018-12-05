import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewStudentComponent } from './renew-student.component';

describe('RenewStudentComponent', () => {
  let component: RenewStudentComponent;
  let fixture: ComponentFixture<RenewStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ RenewStudentComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
