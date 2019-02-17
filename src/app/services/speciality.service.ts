import {Injectable} from '@angular/core';
import {Speciality} from '../models/Speciality';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class SpecialityService {
    private url = `${environment.apiUrl}/specialities`;

    constructor(private http: HttpClient) {
    }

    getSpecialities(): Observable<Speciality[]> {
        return this.http.get<Speciality[]>(this.url);
    }

    getActiveSpecialities(): Observable<Speciality[]> {
        return this.http.get<Speciality[]>(`${this.url}/all`);
    }
}
