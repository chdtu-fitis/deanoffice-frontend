export class Grade {
  id?: number;
  grade?: number;
  academicDifference: boolean;
  courseId: number;
  onTime: boolean;
  points: number;
  studentDegreeId: number;

  // view property
  empty?: boolean;
  wrongInterval?: boolean;
  changed?: boolean;

  constructor(points: number, empty: boolean, courseId: number, academicDifference: boolean, studentDegreeId: number, onTime: boolean) {
    this.points = points;
    this.empty = empty;
    this.courseId = courseId;
    this.academicDifference = academicDifference;
    this.studentDegreeId = studentDegreeId;
    this.onTime = onTime;
  }

}
