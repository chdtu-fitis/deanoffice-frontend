export class CourseForStudentWrite {
  courseId: number;
  teacherId: number;
  courseType: string;

  constructor(courseId: number, teacherId: number, courseType: string) {
    this.courseId = courseId;
    this.teacherId = teacherId;
    this.courseType = courseType;
  }
}
