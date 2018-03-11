import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Degree} from '../models/Degree';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {handleErrorForObservable} from './httpErrors';

@Injectable()
export class DegreeService {
    private degreesUrl = 'http://localhost:8080/degrees';

    constructor(private http: HttpClient) {
    }

    getDegrees(): Observable<Degree[]> {
        return this.http.get<Degree[]>(this.degreesUrl)
            .pipe(
                catchError(handleErrorForObservable('getDegrees', []))
            );
    }
}
