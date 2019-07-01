import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'abbreviate'
})
export class AbbreviatedNamePipe implements PipeTransform {

  private regExp: RegExp = new RegExp('((?<=[- ])|^)(?!та|і )[A-Zа-яА-ЯіІ]', 'g');

  transform(value: string, args?: any): any {
    const matchList = value.match(this.regExp);
    return matchList
      .map(char => char.toUpperCase())
      .reduce((curr, prev) => curr + prev, '');
  }
}
