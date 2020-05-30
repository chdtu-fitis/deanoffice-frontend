import { TestBed } from '@angular/core/testing';

import { OrderApproversService } from './order-approvers.service';

describe('OrderApproversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderApproversService = TestBed.get(OrderApproversService);
    expect(service).toBeTruthy();
  });
});
