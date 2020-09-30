import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SelectiveCourse} from "../models/SelectiveCourse";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {forObservable} from "../components/shared/httpErrors";

const SELECTIVE_COURSE_URL: string = environment.apiUrl + '/selective-courses';

@Injectable()
export class SelectiveCourseService {
  constructor(private httpClient: HttpClient) { }

  getSelectiveCourses(studyYear: string): Observable<SelectiveCourse[]> {
    return this.httpClient.get<SelectiveCourse[]>(`${SELECTIVE_COURSE_URL}?studyYear=${studyYear}`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }
}
