import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderApproversTemplateComponent } from './create-order-approvers-template.component';

describe('CreateOrderApproversTemplateComponent', () => {
  let component: CreateOrderApproversTemplateComponent;
  let fixture: ComponentFixture<CreateOrderApproversTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrderApproversTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderApproversTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
