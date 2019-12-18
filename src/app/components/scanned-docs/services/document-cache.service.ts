import { Injectable } from '@angular/core';
import { ScannedDocument } from '../models/scanned-document';

@Injectable()
export class DocumentCacheService {
  private readonly documentStorageKey = 'scanned-document';

  get document(): ScannedDocument {
    const storage = sessionStorage.getItem(this.documentStorageKey);
    return JSON.parse(storage) as ScannedDocument;
  }

  set document(d: ScannedDocument) {
    if (d) {
      sessionStorage.setItem(this.documentStorageKey, JSON.stringify(d));
    } else {
      sessionStorage.removeItem(this.documentStorageKey);
    }
  }
}
