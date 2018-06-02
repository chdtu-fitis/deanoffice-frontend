import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Grade} from '../models/Grade';
import {environment} from '../../environments/environment';
import {HandleError} from '../components/shared/httpErrors';

@Injectable()
export class GradeService {
    private url = `${environment.apiUrl}/grades`;

    constructor(private http: HttpClient) {
    }

    public getGradesByGroupIdAndBySemester(groupId: number, semester: number): Observable<Grade[]> {
        return this.http.get<Grade[]>(`${this.url}/${groupId}?semester=${semester}`)
            .pipe(catchError(HandleError.forObservable('Отримання оцінок для обраної групи, за обраним семестром', [])));
    }

    public getGradesByGroupIdAndCourseId(groupId: number, courseId: number): Observable<Grade[]> {
        return this.http.get<Grade[]>(`${this.url}/${groupId}/${courseId}`)
            .pipe(catchError(HandleError.forObservable('Отримання оцінок для обраної групи, за обраним предметом', [])));
    }

    public updateGrades(grades): Observable<Grade[]> {
        return this.http.put<Grade[]>(`${this.url}/`, grades)
            .pipe(catchError(HandleError.forObservable('Відправка оновлених оцінок', [])));
    }
}
