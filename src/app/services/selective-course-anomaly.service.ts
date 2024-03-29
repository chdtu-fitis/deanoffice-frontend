import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {RegisteredStudentsStatistics} from '../components/selective-course/selective-courses-statistics/models/RegisteredStudentsStatistics';

const SELECTIVE_COURSE_ANOMALY_URL: string = environment.apiUrl + '/selective-courses-anomaly';

@Injectable()
export class SelectiveCourseAnomalyService {
  constructor(private httpClient: HttpClient) {
  }
  getStudentsSelectedSelectiveCoursesMoreNorm(degreeId: number,
                                              studyYear: number,
                                              studentYear: number,
                                              moreNorm: boolean
                                        ): Observable<RegisteredStudentsStatistics[]>{
    if (studentYear === 0) {
      return this.httpClient.get<RegisteredStudentsStatistics[]>(
        `${SELECTIVE_COURSE_ANOMALY_URL}?degreeId=${degreeId}&studyYear=${studyYear}&moreNorm=${moreNorm}`);
    }
    return this.httpClient.get<RegisteredStudentsStatistics[]>(
      `${SELECTIVE_COURSE_ANOMALY_URL}?degreeId=${degreeId}&studyYear=${studyYear}&studentYear=${studentYear}&moreNorm=${moreNorm}`);
  };
}

