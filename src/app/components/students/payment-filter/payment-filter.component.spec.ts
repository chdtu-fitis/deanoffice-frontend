import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFilterComponent } from './payment-filter.component';

describe('PaymentFilterComponent', () => {
  let component: PaymentFilterComponent;
  let fixture: ComponentFixture<PaymentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should createTeacher', () => {
    expect(component).toBeTruthy();
  });
});
