import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApproversFormsComponent } from './order-approvers-forms.component';

describe('OrderApproversFormsComponent', () => {
  let component: OrderApproversFormsComponent;
  let fixture: ComponentFixture<OrderApproversFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApproversFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApproversFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
