import {Injectable} from '@angular/core';
import {StudentGroup} from '../models/StudentGroup';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {HandleError} from '../components/shared/httpErrors';

@Injectable()
export class GroupService {
  private groupsUrl = `${environment.apiUrl}/groups`;
  private groupsByDegreeUrl = this.groupsUrl + '/graduates';

  constructor(private http: HttpClient) {
  }

  getGroups(onlyActual: boolean = true): Observable<StudentGroup[]> {
    const params = new HttpParams().set('only-active', onlyActual.toString());
    return this.http.get<StudentGroup[]>(`${this.groupsUrl}`, {params: params})
      .pipe(catchError(HandleError.forObservable('Отримання груп', [])));
  }

  getGroupsByDegree(degreeId: string): Observable<StudentGroup[]> {
    const url = `${this.groupsByDegreeUrl}?degreeId=${degreeId}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(catchError(HandleError.forObservable('Отримання груп за освітньо-кваліфікаційним рівнем', [])));
  }

  getGroupsByDegreeAndYear(degreeId: number, year: number): Observable<StudentGroup[]> {
    const url = `${this.groupsUrl}/filter?degreeId=${degreeId}&year=${year}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(catchError(HandleError.forObservable('Отримання груп за освітньо-кваліфікаційним рівнем та курсом', [])));
  }
}
