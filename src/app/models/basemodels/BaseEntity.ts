export class BaseEntity {
  id: number;
}

export const getId = (odj: BaseEntity) => odj.id;
