import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ConsolidatedDocumentService {

  static BASE_URL = `${environment.apiUrl}/consolidated-document`;

  constructor(private http: HttpClient) { }

}
