import {TypeCycle} from '../../../../models/TypeCycle';

export class ImportSelectiveCourseCorrect {
  courseName: string;
  semester: number;
  teacher: string;
  degreeId?: number;
  departmentAbbr: string;
  fieldsOfKnowledge: number;
  trainingCycle: TypeCycle;
  description: string;
  studyYear?: number;
  selected?: boolean;
}
