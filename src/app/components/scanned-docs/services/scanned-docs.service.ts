import { Injectable } from '@angular/core';
import { ScannedDocument } from '../models/scanned-document';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ScannedDocsService {

  fetch(): Observable<ScannedDocument[]> {
    // TODO: call backend to fetch this data
    console.warn('Fetching scanned documents from server');

    return of([
      {
        courseName: 'Web programming',
        groupName: 'Fitis 1',
        students: [
          { name: 'Student 1', grade: 75 },
          { name: 'Student 2', grade: 81 },
          { name: 'Student 3', grade: 94 }
        ]
      },
      {
        courseName: 'Object oriented programming',
        groupName: 'Fitis 1',
        students: [
          { name: 'Student 2', grade: 71 },
          { name: 'Student 4', grade: 70 }
        ]
      },
      {
        courseName: 'Artificial inteligence',
        groupName: 'Fitis 2',
        students: [
          { name: 'Student 3', grade: 90 }
        ]
      }
    ]);
  }

  fetchItem(doc: ScannedDocument): Observable<ScannedDocument> {
    return this.fetch().map(
      (docs: ScannedDocument[]) => docs.find(
        (val: ScannedDocument) => val.courseName === doc.courseName && val.groupName === doc.groupName
      )
    );
  }
}
