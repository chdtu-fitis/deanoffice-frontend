import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionOrderComponent } from './deduction-order.component';

describe('DeductionOrderComponent', () => {
  let component: DeductionOrderComponent;
  let fixture: ComponentFixture<DeductionOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductionOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
