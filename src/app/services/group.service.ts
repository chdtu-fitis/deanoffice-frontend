import { Injectable } from '@angular/core';
import { StudentGroup } from '../models/StudentGroup';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { forObservable, forPromise } from '../components/shared/httpErrors';

@Injectable()
export class GroupService {
  private groupsUrl = `${environment.apiUrl}/groups`;
  private groupsByDegreeUrl = this.groupsUrl + '/graduates';

  constructor(private http: HttpClient) {
  }

  getGroups(onlyActual: boolean = true): Observable<StudentGroup[]> {
    const params = new HttpParams().set('only-active', onlyActual.toString());
    return this.http.get<StudentGroup[]>(`${this.groupsUrl}`, { params: params })
      .pipe(catchError(forObservable('Отримання груп', [])));
  }

  getGroupsByDegree(degreeId: string): Observable<StudentGroup[]> {
    const url = `${this.groupsByDegreeUrl}?degreeId=${degreeId}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(catchError(forObservable('Отримання груп за освітньо-кваліфікаційним рівнем', [])));
  }

  getGroupsByDegreeAndYear(degreeId: number, year: number): Observable<StudentGroup[]> {
    const url = `${this.groupsUrl}/filter?degreeId=${degreeId}&year=${year}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(catchError(forObservable('Отримання груп за освітньо-кваліфікаційним рівнем та курсом', [])));
  }

  create(body): Promise<any> {
    return this.http.post(this.groupsUrl, body, {}).toPromise()
      .catch(forPromise('Створення нової групи'));
  }

  delete(ids: number[]): Observable<Object> {
    const url = `${this.groupsUrl}/${ids.join(', ')}`;
    return this.http.delete(url)
      .pipe(catchError(forObservable('Видалення групи', [])));
  }

  update(body): Promise<any> {
    return this.http.put(this.groupsUrl, body).toPromise()
      .catch(forPromise('Оновлення групи'));
  }
}
