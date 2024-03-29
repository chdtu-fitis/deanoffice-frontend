import {Student} from './Student';

export class SelectiveCourseWithStudents {
  selectiveCourseId: number;
  semester: number;
  courseName: string;
  fieldOfKnowledgeCode: string;
  trainingCycle: string;
  students: Student[];

  selected?: boolean = false;
  expanded?: boolean = false;
}
