import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KnowledgeControl} from '../models/KnowlegeControl';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class KnowledgeControlService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<KnowledgeControl[]>{
    return this.http.get<KnowledgeControl[]>(`http://localhost:8080/knowledgeControls`);
  }

}
