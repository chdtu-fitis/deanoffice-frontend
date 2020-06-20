import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:
    'initialsAndSurname'
})

export class InitialsAndSurnamePipe implements PipeTransform {

  transform(orderApproverName: string): string{
    if (orderApproverName) {
      let splitedName = orderApproverName.split(/\s|\./);
      let surname = splitedName[0];
      let firstLetterOfName = splitedName[1] ? splitedName[1].slice(0,1) : '';
      let firstLetterOfFathersName = splitedName[2] ? splitedName[2].slice(0,1) : '';
      return `${firstLetterOfName}.${firstLetterOfFathersName}. ${surname}`
    }
  }
}
