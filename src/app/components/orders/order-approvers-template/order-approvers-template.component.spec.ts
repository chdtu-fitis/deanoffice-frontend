import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApproversTemplateComponent } from './order-approvers-template.component';

describe('OrderApproversTemplateComponent', () => {
  let component: OrderApproversTemplateComponent;
  let fixture: ComponentFixture<OrderApproversTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderApproversTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApproversTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
