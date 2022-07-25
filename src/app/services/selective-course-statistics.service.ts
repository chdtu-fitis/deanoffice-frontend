import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {RegisteredStudentsStatistics} from '../components/selective-course/selective-courses-statistics/models/RegisteredStudentsStatistics';

const SELECTIVE_COURSE_STATISTICS_URL: string = environment.apiUrl + '/selective-courses-statistics';

@Injectable()
export class SelectiveCourseStatisticsService {
  constructor(private httpClient: HttpClient) {
  }

  getStudentsNotSelectedSelectiveCourse(studyYear: number,
                                        degreeId: number): Observable<RegisteredStudentsStatistics[]>{
    return this.httpClient.get<RegisteredStudentsStatistics[]>(
      `${SELECTIVE_COURSE_STATISTICS_URL}/selected-zero?degreeId=${degreeId}&studyYear=${studyYear}`);
  };

  getStudentsPercentWhoChosenSelectiveCourse(studyYear: number, degreeId: number,
                                             selectiveStatisticsCriteria: string): Observable<RegisteredStudentsStatistics[]>{
    return this.httpClient.get<RegisteredStudentsStatistics[]>(
      `${SELECTIVE_COURSE_STATISTICS_URL}/registered-percent?studyYear=${studyYear}&degreeId=${degreeId}&selectiveStatisticsCriteria=${selectiveStatisticsCriteria}`);
  };
}

