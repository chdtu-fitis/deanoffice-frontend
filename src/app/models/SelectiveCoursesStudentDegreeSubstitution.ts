import {ExistingId} from './ExistingId';

export class SelectiveCoursesStudentDegreeSubstitution {
  selectiveCoursesIdsToAdd: number[];
  selectiveCoursesIdsToDrop: number[];
  studentDegree: ExistingId;
  studyYear: number;

  constructor(selectiveCoursesIdsToAdd: number[], selectiveCoursesIdsToDrop: number[], studentDegree: ExistingId, studyYear: number) {
    this.selectiveCoursesIdsToAdd = selectiveCoursesIdsToAdd;
    this.selectiveCoursesIdsToDrop = selectiveCoursesIdsToDrop;
    this.studentDegree = studentDegree;
    this.studyYear = studyYear;
  }
}
