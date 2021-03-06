import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {StudentGroup} from '../models/StudentGroup';
import {map} from 'rxjs/operators';
import {saveAs} from 'file-saver';
import {Course} from '../models/Course';

@Injectable()
export class ConsolidatedExamReportService {

  static BASE_URL = `${environment.apiUrl}/documents/consolidated-exam-report`;

  constructor(private http: HttpClient) { }

  public getGroupThatLearnSameCourses(courses: Course[], degreeId: number): Observable<Map<Course, Array<StudentGroup>>> {
    const courseIds = courses.map(value => value.id);
    return this.http
      .post<Map<number, Array<StudentGroup>>>(
        `${ConsolidatedExamReportService.BASE_URL}/groups/subjects?degreeId=${degreeId}`, courseIds
      )
      .pipe(
        map(value => {
          const input = new Map<number, Array<StudentGroup>>();
          Object.keys(value).forEach(key => {
            input.set(+key, value[key]);
          });
          const courseToStudentGroup = new Map<Course, Array<StudentGroup>>();
          input.forEach((studentGroups, courseId) => {
            const foundCourse = courses.find(course => course.id === courseId);
            courseToStudentGroup.set(foundCourse, studentGroups);
          });
          return courseToStudentGroup;
        })
      );
  }

  public formConsolidatedDocument(courseForGroupIdsToStudentGroupIds: any) {
    const response = this.http.post(`${ConsolidatedExamReportService.BASE_URL}/create-document`,
      courseForGroupIdsToStudentGroupIds,
      {
        responseType: 'blob',
        observe: 'response',
        headers: new HttpHeaders().append('content-filename', 'file'),
      }
    );
    response.subscribe((res: any) => {
      saveAs(res.body, res.headers.get('content-filename'))
    }, error => {
      console.log(error);
    });
    return response;
  }

  public getGroupByCourse(course: Course): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(`${ConsolidatedExamReportService.BASE_URL}/course/${course.id}`);
  }
}
