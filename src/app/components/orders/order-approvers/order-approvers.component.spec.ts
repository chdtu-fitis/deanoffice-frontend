import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApproversComponent } from './order-approvers.component';

describe('OrderApproversComponent', () => {
  let component: OrderApproversComponent;
  let fixture: ComponentFixture<OrderApproversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApproversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
