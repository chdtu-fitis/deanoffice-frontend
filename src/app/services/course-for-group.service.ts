import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseForGroup} from '../models/CourseForGroup';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CourseForGroupService {

  constructor(private http: HttpClient) {
  }

}
