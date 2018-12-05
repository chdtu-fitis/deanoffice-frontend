import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'entries' })
export class EntriesPipe implements PipeTransform {
  transform(value): any {
    return Object.keys(value).map(key => ({
      key,
      value: value[key] 
    }));
  }
}
