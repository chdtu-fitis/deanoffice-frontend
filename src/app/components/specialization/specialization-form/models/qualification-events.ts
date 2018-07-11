export class QualificationEvents {
  selected: number[] = [];
  deleted: number[] = [];
  specializationId: number;
  initialIds: number[];

  constructor(specializationId?: number) {
    this.specializationId = specializationId;
  }

  clear(): void {
    this.selected = [];
    this.deleted = [];
  }
}
