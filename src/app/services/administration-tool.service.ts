import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

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

}
