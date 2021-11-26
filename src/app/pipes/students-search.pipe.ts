import {Pipe, PipeTransform} from '@angular/core';
import {Course} from "../models/Course";

@Pipe({name: 'studentsSearch'})
export class StudentsSearchPipe implements PipeTransform {
  transform(items: any[], searchTextForStudents: string): any[] {
    if (!items || items.length == 0)
      return [];
    if (!searchTextForStudents)
      return items;
    searchTextForStudents =searchTextForStudents.toLowerCase();
    if (!items[0].studentDegree) {
      return items.filter( studentDegree => {
        return studentDegree.student.surname.toLowerCase().startsWith(searchTextForStudents);
      })
    } else {
      return items.filter( studentDegree => {
        return studentDegree.student.surname.toLowerCase().startsWith(searchTextForStudents);
      });
    }
  }
}
