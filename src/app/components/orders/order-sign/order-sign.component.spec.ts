import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSignComponent } from './order-sign.component';

describe('OrderSignComponent', () => {
  let component: OrderSignComponent;
  let fixture: ComponentFixture<OrderSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
