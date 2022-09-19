export class Student {
  id: number;
  name: string;
  isCourseSelected: boolean = false;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
