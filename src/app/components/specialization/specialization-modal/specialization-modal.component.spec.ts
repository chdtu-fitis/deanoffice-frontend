import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationModalComponent } from './specialization-modal.component';

describe('SpecializationModalComponent', () => {
  let component: SpecializationModalComponent;
  let fixture: ComponentFixture<SpecializationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ SpecializationModalComponent ] })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecializationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
