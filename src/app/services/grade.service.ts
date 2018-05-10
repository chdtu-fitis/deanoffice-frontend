import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {Grade} from '../models/Grade';
import {environment} from '../../environments/environment';

@Injectable()
export class GradeService {
    private url = `${environment.apiUrl}/grades`;

    constructor(private http: HttpClient) {
    }

    public getGradesByGroupIdAndBySemester(groupId: number, semester: number): Observable<Grade[]> {
        return this.http.get<Grade[]>(`${this.url}/${groupId}?semester=${semester}`).pipe(
            catchError(this.handleError('getGradesByGroupIdAndBySemester', []))
        );
    }

    public updateGrades(grades): Observable<Grade[]> {
        return this.http.put<Grade[]>(`${this.url}/`, grades).pipe(
            catchError(this.handleError('updateGrades', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}
