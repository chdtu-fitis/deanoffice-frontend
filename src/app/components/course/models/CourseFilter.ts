import {Course} from '../../../models/Course';

export class CourseFilter extends Course {
  page: number;

  constructor(currentPage, searchFormValue) {
    super();
    this.page = currentPage;
    this[searchFormValue.cmbValue] = searchFormValue.name;
    this.hours = searchFormValue.hours;
    this.hoursPerCredit = searchFormValue.hoursPerCredit;
    this.knowledgeControl = searchFormValue.knowledgeControl;
    this.semester = searchFormValue.semester;
  }

}
