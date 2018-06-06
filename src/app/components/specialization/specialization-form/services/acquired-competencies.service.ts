import { Injectable } from '@angular/core';
import {HandleError} from '../../../shared/httpErrors';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AcquiredCompetencies} from '../../../../models/AcquiredCompetencies';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {SPECIALIZATION_URL} from '../../../../services/specialization.service';
import {Lang} from '../enums/lang.enum';
import {catchError} from 'rxjs/operators';

const API_URL: string = environment.apiUrl;
const ACQUIRED_COMPETENCIES_URL: string = API_URL + '/acquired-competencies';

@Injectable()
export class AcquiredCompetenciesService {
  constructor(private _httpClient: HttpClient) { }

  getCompetencies(specializationId: number, lang: Lang): Observable<any> {
    return this._httpClient.get(`${SPECIALIZATION_URL}/${specializationId}/competencies/${lang}`)
      .pipe(catchError(HandleError.forObservable(`Отримання компетенцій для спеціалізації (${this.getFullValue(lang)})`, [])));
  }

  getFullValue(lang: Lang): string {
    if (lang === Lang.UKR) {
      return 'українською';
    }
    if (lang === Lang.ENG) {
      return 'англійською';
    }
  }

  updateCompetencies(competenciesId: number, competencies: string, lang: Lang): Promise<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this._httpClient.put(`${ACQUIRED_COMPETENCIES_URL}/${competenciesId}/${lang}`, competencies, {headers})
      .toPromise()
      .catch((error: Error) => HandleError.forPromise(error, `Оновлення компетенцій для спеціалізації (${this.getFullValue(lang)})`));
  }

  createCompetencies(competencies: AcquiredCompetencies): Promise<any> {
    return this._httpClient.post(`${ACQUIRED_COMPETENCIES_URL}`, competencies).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Створення компетенцій для спеціалізації'));
  }
}
