import {ImportSelectiveCourseCorrect} from './ImportSelectiveCourseCorrect';

export class ImportSelectiveCourseForSave extends ImportSelectiveCourseCorrect {
  degreeId: number;
  studyYear: number;

  constructor(course: ImportSelectiveCourseCorrect, degree, year) {
    super();
    //this.courseName= course.courseName;
    Object.assign(this, course);
    this.degreeId = degree;
    this.studyYear = year;
  }

}
