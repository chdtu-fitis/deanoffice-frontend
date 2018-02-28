import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Degree} from '../models/Degree';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {handleError} from './httpErrors';

@Injectable()
export class DegreeService {
    private degreesUrl = 'http://localhost:8080/degrees';

    constructor(private http: HttpClient) {
    }

    // getDegrees(): Degree[] {
    //   return [{id: 1, name: "бакалавр"},{id: 3, name: "магістр"}];
    // }
    // TODO: Прохання такі речі за собою прибирати

    getDegrees(): Observable<Degree[]> {
        return this.http.get<Degree[]>(this.degreesUrl)
            .pipe(
                catchError(handleError('getDegrees', []))
            );
    }
}
