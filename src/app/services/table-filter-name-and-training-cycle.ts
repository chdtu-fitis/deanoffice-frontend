import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TableFilterNameAndTrainingCycleService {

  // Observable string sources
  private newFilterSource = new Subject<string[]>();

  // Observable string streams
  newFilterAnnounced$ = this.newFilterSource.asObservable();

  announceNewFilter(newFilter: string[]) {
    this.newFilterSource.next(newFilter);
  }
}
