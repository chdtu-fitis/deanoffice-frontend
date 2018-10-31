import { Pipe, PipeTransform } from '@angular/core';
import {Person} from '../models/basemodels/Person'

@Pipe({
  name: 'nameWithInitials'
})
export class NameWithInitialsPipe implements PipeTransform {
  transform(person: Person): any {
    if (person == null || !Object.keys(person).length) {
      return '';
    }
    if (person.patronimic) {
      return `${person.surname} ${person.name.charAt(0)}.${person.patronimic.charAt(0)}.`;
    } else {
      return `${person.surname} ${person.name.charAt(0)}.`
    }
  }
}
