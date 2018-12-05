import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Grade } from '../models/Grade';
import { environment } from '../../environments/environment';
import { forObservable } from '../components/shared/httpErrors';

@Injectable()
export class GradeService {
    private url = `${environment.apiUrl}/grades`;

    constructor(private http: HttpClient) {
    }

    public getGradesByGroupIdAndBySemester(groupId: number, semester: number): Observable<Grade[]> {
      return this.http.get<Grade[]>(`${this.url}/${groupId}?semester=${semester}`)
        .pipe(catchError(forObservable('Отримання оцінок для обраної групи, за обраним семестром', [])));
    }

    public getGradesByGroupIdAndCourseId(groupId: number, courseId: number): Observable<Grade[]> {
      return this.http.get<Grade[]>(`${this.url}/${groupId}/${courseId}`)
        .pipe(catchError(forObservable('Отримання оцінок для обраної групи, за обраним предметом', [])));
    }

    public updateGrades(grades: Grade[]): Observable<Grade[]> {
      return this.http.put<Grade[]>(`${this.url}/`, grades)
        .pipe(catchError(forObservable('Відправка оновлених оцінок', [])));
    }

    public deleteGradeById(gradeId: number): Observable<Grade[]> {
      return this.http.delete<Grade[]>(`${this.url}?gradeId=${gradeId}`)
        .pipe(catchError(forObservable('Видалення оцiнок', [])));
    }
}

