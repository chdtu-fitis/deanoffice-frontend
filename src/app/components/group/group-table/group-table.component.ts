import {Component, Input} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {TuitionTerm} from '../../../models/tuition-term.enum';
import {TuitionForm} from '../../../models/tuition-form.enum';

@Component({
  selector: 'group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];
  @Input() searchText: string;
  cols = [
    {name: 'Назва', prop: 'name'},
    {name: 'Спеціалізація', prop: 'specialization.name'},
    {name: 'Ступінь', prop: 'specialization.degree.name'},
    {name: 'Форма навчання', prop: 'tuitionForm'},
    {name: 'Термін навчання', prop: 'tuitionTerm'},
    {name: 'Рік створення', prop: 'creationYear'},
    {name: 'Рік початку', prop: 'beginYears'},
    {name: 'Років начання', prop: 'studyYears'},
    {name: 'Семестрів', prop: 'studySemesters'},
  ];

  @Input() loading: boolean;




}
