import {Injectable} from "@angular/core";
import {Degree} from "../entity/Degree";

@Injectable()
export class DegreeService {
  getDegrees(): Degree[] {
    return [{id: 1, name: "бакалавр"},{id: 3, name: "магістр"}];
  }
}
