import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Degree} from '../models/Degree';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HandleError} from '../components/shared/httpErrors';

@Injectable()
export class DegreeService {
  private degreesUrl = `${environment.apiUrl}/degrees`;

    getDegrees(): Observable<Degree[]> {
        return this.http.get<Degree[]>(this.degreesUrl)
            .pipe(catchError(HandleError.forObservable('Отримання списку освітньо-кваліфікаційного рівня', [])));
    }
  constructor(private http: HttpClient) {
  }
}
