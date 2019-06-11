export class GradeUpdateAcademicDifference {
  [key: string]: number[];

  constructor(academicDifference: boolean, gradeId: number[]) {
    this[academicDifference.toString()] = gradeId;
  }
}
