import { TestBed, async, inject } from '@angular/core/testing';

import { EditDocumentGuard } from './edit-document.guard';

describe('EditDocumentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditDocumentGuard]
    });
  });

  it('should ...', inject([EditDocumentGuard], (guard: EditDocumentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
