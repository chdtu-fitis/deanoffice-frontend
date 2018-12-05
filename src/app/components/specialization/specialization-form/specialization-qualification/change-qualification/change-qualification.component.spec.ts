import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQualificationComponent } from './change-qualification.component';

describe('ChangeQualificationComponent', () => {
  let component: ChangeQualificationComponent;
  let fixture: ComponentFixture<ChangeQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ ChangeQualificationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
