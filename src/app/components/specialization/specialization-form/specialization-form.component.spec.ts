import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationFormComponent } from './specialization-form.component';

describe('SpecializationFormComponent', () => {
  let component: SpecializationFormComponent;
  let fixture: ComponentFixture<SpecializationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ SpecializationFormComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
