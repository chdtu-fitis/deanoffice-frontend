import { TestBed } from '@angular/core/testing';

import { OrderApproversTemplateService } from './order-approvers-template.service';

describe('OrderApproversTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderApproversTemplateService = TestBed.get(OrderApproversTemplateService);
    expect(service).toBeTruthy();
  });
});
