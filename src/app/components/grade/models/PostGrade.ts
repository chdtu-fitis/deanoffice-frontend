import {EmptyGrade} from './EmptyGrade';
import {Course} from '../../../models/Course';
import {StudentDegree} from '../../../models/StudentDegree';

export class PostGrade {
  id: number;
  course: Course;
  studentDegree: StudentDegree;
  onTime: boolean;
  points: number;

  constructor(grade: EmptyGrade) {
    this.id = 'id' in grade ? grade.id : undefined;
    this.course = new Course();
    this.course.id = grade.courseId;
    this.studentDegree = new StudentDegree();
    this.studentDegree.id = grade.studentDegreeId;
    this.onTime = grade.onTime;
    this.points = grade.points;
  }

}

