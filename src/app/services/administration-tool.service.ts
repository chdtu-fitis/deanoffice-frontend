import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {CourseName} from '../models/CourseName';

export interface SimilarCourse {
  id: number;
  name: string;
}

@Injectable()
export class AdministrationToolService {

  private static BASE_URL = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  public getSimilarCourse(): Observable<SimilarCourse[][]>  {
    return this.httpClient.get<SimilarCourse[][]>(AdministrationToolService.BASE_URL + '/course-names/similar');
  }

  public mergeSimilarCourses(mergeStructure: {[key: string]: number[]}): Observable<Object> {
    return this.httpClient.post(AdministrationToolService.BASE_URL + '/merge', mergeStructure);
  }

  public getUnusedCourseNames(): Observable<CourseName[]> {
    return this.httpClient.get<CourseName[]>(AdministrationToolService.BASE_URL + '/course-names/unused');
  }

  public deleteUnusedCourseNames(courseNameIds: string[]): Observable<void> {
    return this.httpClient.delete<void>(AdministrationToolService.BASE_URL + '/course-names', {
      params: {
        ids: courseNameIds,
      }
    });
  }

}
