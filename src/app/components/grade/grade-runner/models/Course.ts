import {NameEntity} from '../../../../models/basemodels/NameEntity';

export class Course extends NameEntity {
  semester: number;

  constructor(id: number, courseName: NameEntity, semester: number) {
    super();
    this.id = id;
    this.name = courseName.name;
    this.semester = semester;
  }

  isEqual(course: Course): boolean {
    return this.id === course.id && this.semester === course.semester;
  }
}
