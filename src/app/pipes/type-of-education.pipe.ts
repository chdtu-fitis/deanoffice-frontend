import {Pipe, PipeTransform} from '@angular/core';
import {StudentGroup} from "../models/StudentGroup";
import {TuitionForm} from "../models/tuition-form.enum";

@Pipe({
  name: 'typeOfEducation'
})
export class TypeOfEducationPipe implements PipeTransform {

  transform(items: StudentGroup[], fullTimeGroupsVisible: boolean, extramuralGroupsVisible: boolean): any {
    if (fullTimeGroupsVisible && !extramuralGroupsVisible) {
      return items.filter((group) => TuitionForm[group.tuitionForm] == TuitionForm.FULL_TIME);
    }
    if (extramuralGroupsVisible && !fullTimeGroupsVisible) {
      return items.filter((group) => TuitionForm[group.tuitionForm] == TuitionForm.EXTRAMURAL);
    }
    return items;
  }
}
