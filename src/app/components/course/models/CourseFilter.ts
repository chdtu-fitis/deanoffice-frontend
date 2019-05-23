import {Course} from '../../../models/Course';

export class CourseFilter extends Course {
  page: number;
  nameStartingWith: string;
  nameContains: string;

  constructor(currentPage, searchForm) {
    super();
    this.page = currentPage;
    switch (searchForm.value.cmbValue) {
      case 'Повна назва предмета': {
        this.courseName = searchForm.value.name;
        break;
      }
      case 'Назва починаєтья з': {
        this.nameStartingWith = searchForm.value.name;
        break;
      }
      case 'Назва містить в собі': {
        this.nameContains = searchForm.value.name;
        break;
      }
    }
    this.hours = searchForm.value.hours;
    this.hoursPerCredit = searchForm.value.hoursPerCredit;
    this.knowledgeControl = searchForm.value.knowledgeControl;
    this.semester = searchForm.value.semester;
  }

}
