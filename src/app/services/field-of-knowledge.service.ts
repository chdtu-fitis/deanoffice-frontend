import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {FieldOfKnowledge} from '../models/FieldOfKnowledge';

const FIELD_OF_KNOWLEDGE_URL: string = environment.apiUrl + '/field-of-knowledge';

@Injectable()
export class FieldOfKnowledgeService {
  constructor(private httpClient: HttpClient) {
  }

  getFieldsOfKnowledge() {
    return this.httpClient.get<FieldOfKnowledge[]>(
      `${FIELD_OF_KNOWLEDGE_URL}?`)
      .pipe(catchError(forObservable('Отримання списку спеціальностей', [])));
  }
}
