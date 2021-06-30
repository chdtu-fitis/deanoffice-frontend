export class BaseEntity {
  id: number;

  constructor(id?: number) {
    this.id = id || 0;
  }
}

export const getId = (odj: BaseEntity) => odj.id;
