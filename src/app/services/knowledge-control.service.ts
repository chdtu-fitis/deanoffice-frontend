import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KnowledgeControl} from '../models/KnowlegeControl';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class KnowledgeControlService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<KnowledgeControl[]>{
    return this.http.get<KnowledgeControl[]>(`${environment.apiUrl}/knowledgeControls`);
  }

}
