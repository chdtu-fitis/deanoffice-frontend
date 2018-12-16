import { Pipe, PipeTransform } from '@angular/core';

export type EntryValue = {
  key: string,
  value: any
};

@Pipe({ name: 'entries' })
export class EntriesPipe implements PipeTransform {
  transform(value): any {
    return Object.keys(value).map((key: string): EntryValue => ({
      key,
      value: value[key]
    }));
  }
}
