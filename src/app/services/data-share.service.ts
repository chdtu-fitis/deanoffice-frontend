import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class DataShareService {
  private generateSelectiveGroupNamesSubject = new Subject();
  generateSelectiveCourseGroupNames$ = this.generateSelectiveGroupNamesSubject.asObservable();

  emitSelectiveGroupNamesGenerated() {
    this.generateSelectiveGroupNamesSubject.next();
  }
}
