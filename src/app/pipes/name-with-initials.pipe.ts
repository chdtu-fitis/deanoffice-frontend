import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameWithInitials'
})
export class NameWithInitialsPipe implements PipeTransform {

  transform(fullName: string): any {
    // let parts = fullName.split(' ');
    // let surname = parts[0], name = parts[1], patronimic = parts[2];
    // if (surname && surname.length !== 0)
    //   return '';
    // let result = surname;
    // if (name && name.length !== 0)
    //   result += name.charAt(0)+'.';
    // if (patronimic && patronimic.length !== 0)
    //   result += patronimic.charAt(0)+'.';
    // return result;
    return fullName.toUpperCase();
  }

  private isNullOrWhiteSpace(str: string): boolean {
    return (!str || str.length === 0 || /^\s*$/.test(str))
  }
}
