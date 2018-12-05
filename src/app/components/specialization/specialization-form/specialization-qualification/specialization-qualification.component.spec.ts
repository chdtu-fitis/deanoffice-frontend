import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationQualificationComponent } from './specialization-qualification.component';

describe('SpecializationQualificationComponent', () => {
  let component: SpecializationQualificationComponent;
  let fixture: ComponentFixture<SpecializationQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ SpecializationQualificationComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
