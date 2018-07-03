export class QualificationEvents {
  private selected: number[] = [];
  private deleted: number[] = [];
  specializationId: number;

  constructor(specializationId?: number) {
    this.specializationId = specializationId;
  }

  hasData(): boolean {
    return this.selected.length > 0 || this.deleted.length > 0;
  }

  clear(): void {
    this.selected = [];
    this.deleted = [];
  }

  addSelected(...ids): void {
    this.selected.push(...ids);
    this._deleteConflictedIds(this.deleted, ids);
  }

  addDeleted(...ids): void {
    this.deleted.push(...ids);
    this._deleteConflictedIds(this.selected, ids);
  }

  private _deleteConflictedIds(initialIds: number[], ids: number[]): void {
    ids
      .filter((id: number) => initialIds.includes(id))
      .forEach((id: number) => {
        const index = initialIds.indexOf(id);
        initialIds.splice(index, 1);
      });
  }
}
