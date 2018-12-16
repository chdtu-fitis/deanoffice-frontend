import { TestBed, inject } from '@angular/core/testing';

import { KnowledgeControlService } from './knowledge-control.service';

describe('KnowledgeControlService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ KnowledgeControlService ] });
  });

  it('should be created', inject([ KnowledgeControlService ], (service: KnowledgeControlService): void => {
    expect(service).toBeTruthy();
  }));
});
