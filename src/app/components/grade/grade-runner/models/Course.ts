import {NameEntity} from '../../../../models/basemodels/NameEntity';

export class Course extends NameEntity {
  semester: number;

  constructor(course: NameEntity, semester: number) {
    super();
    this.id = course.id;
    this.name = course.name;
    this.semester = semester;
  }
}
