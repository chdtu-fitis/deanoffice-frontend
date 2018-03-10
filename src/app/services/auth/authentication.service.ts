import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  public token: string;
  public isLoggedIn;

  constructor(private http: HttpClient, private router: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.isLoggedIn = new BehaviorSubject<boolean>(!!this.token)
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('http://localhost:8080/login', JSON.stringify({ email: username, password: password }))
      .map((response:any) => {
        let token = response && response.token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          this.isLoggedIn.next(true);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.isLoggedIn.next(false);
  }

  public getToken(): string {
    return this.token;
  }
}
