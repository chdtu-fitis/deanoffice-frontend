import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { DocumentCacheService } from '../services/document-cache.service';

@Injectable()
export class EditDocumentGuard implements CanActivate {

  constructor(private cache: DocumentCacheService) { }

  canActivate(): boolean {
    return !!this.cache.document;
  }
}
