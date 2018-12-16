export class BaseEntity {
  id: number;
}

export const getId = (odj: BaseEntity): number => odj.id;
