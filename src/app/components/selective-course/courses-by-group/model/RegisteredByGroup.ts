import {SelectiveCourseWithStudents} from './SelectiveCourseWithStudents';
import {Student} from './Student';

export class RegisteredByGroup {
  coursesSelectedByStudentsGroup: SelectiveCourseWithStudents[];
  groupStudentsWithNoSelectedCourses: Student[];
}
