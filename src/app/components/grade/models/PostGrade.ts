import {Course} from '../../../models/Course';
import {StudentDegree} from '../../../models/StudentDegree';
import {Grade} from '../../../models/Grade';

export class PostGrade {
  id: number;
  course: Course;
  studentDegree: StudentDegree;
  onTime: boolean;
  points: number;
  academicDifference: boolean;

  constructor(grade: Grade) {
    this.id = 'id' in grade ? grade.id : undefined;
    this.course = new Course();
    this.course.id = grade.courseId;
    this.studentDegree = new StudentDegree();
    this.studentDegree.id = grade.studentDegreeId;
    this.onTime = grade.onTime;
    this.points = grade.points;
    this.academicDifference = grade.academicDifference;
  }

}

