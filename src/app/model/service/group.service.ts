import { Injectable } from '@angular/core';
import {StudentGroup} from "../entity/StudentGroup";
import {Specialization} from "../entity/Specialization";
import {Degree} from "../entity/Degree";

@Injectable()
export class GroupService {
  groups: StudentGroup[];

  constructor() {
    this.groups = [];
    var group = new StudentGroup();
    group.id = 1;
    group.name = 'МКТ-1601';
    group.specialization = new Specialization();
    group.specialization.id = 1;
    group.specialization.name = 'Інформаційні управляючі системи і технології';
    group.specialization.degree = new Degree();
    group.specialization.degree.id = 3;
    group.specialization.degree.name = 'магістр';
    this.groups.push(group);
    group = new StudentGroup();
    group.id = 2;
    group.name = 'МІТП-1603';
    group.specialization = new Specialization();
    group.specialization.id = 2;
    group.specialization.name = 'Інформаційні технології проектування';
    group.specialization.degree = new Degree();
    group.specialization.degree.id = 3;
    group.specialization.degree.name = 'магістр';
    this.groups.push(group);
  }

  getGroupsByDegree(degreeID: string): StudentGroup[] {
    return this.groups;
  }
}
