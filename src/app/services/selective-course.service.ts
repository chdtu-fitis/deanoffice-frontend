import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SelectiveCourse} from '../models/SelectiveCourse';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

const SELECTIVE_COURSE_URL: string = environment.apiUrl + '/selective-courses';

@Injectable()
export class SelectiveCourseService {
  constructor(private httpClient: HttpClient) {
  }

  getSelectiveCourses(studyYear: string, degreeId: number, semester: number): Observable<SelectiveCourse[]> {
    return this.httpClient.get<SelectiveCourse[]>(
      `${SELECTIVE_COURSE_URL}?studyYear=${studyYear}&degreeId=${degreeId}&semester=${semester}`)
      .pipe(catchError(forObservable('Отримання списку вибіркових предметів', [])));
  }

  createSelectiveCourse(studyYear: number, courseId: number, degreeId: number, departmentId: number,
                        description: string, fieldsOfKnowledge: number[], teacher: any, trainingCycle: string) {
    const body = {
      available: true,
      course: { id: courseId },
      degree: { id: degreeId },
      department: { id: departmentId },
      description: description,
      fieldsOfKnowledge: fieldsOfKnowledge,
      studyYear: studyYear,
      teacher: teacher,
      trainingCycle: trainingCycle,
    };
    return this.httpClient.post(`${SELECTIVE_COURSE_URL}`, body);
  }
}
