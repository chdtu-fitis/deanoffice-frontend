import { TestBed, inject } from '@angular/core/testing';

import { GroupService } from './group.service';

describe('GroupService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ GroupService ] });
  });

  it('should be created', inject([ GroupService ], (service: GroupService): void => {
    expect(service).toBeTruthy();
  }));
});
