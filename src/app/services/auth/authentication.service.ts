import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Faculty} from "../../models/Faculty";
import {UserRole} from "../../models/UserRole.enum";

@Injectable()
export class AuthenticationService {
  public token: string;
  public isLoggedIn;
  public facultiesProvider;

  constructor(private http: HttpClient, private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.isLoggedIn = new BehaviorSubject<boolean>(!!this.token);
    this.facultiesProvider = new BehaviorSubject<Faculty[]>([]);
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/login`, JSON.stringify({ username: username, password: password })).pipe(
      map((response:any) => {
        let token = response && response.token;
        if (token) {
          this.token = token;
          let facultyId = parseInt(response.facultyId);
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, facultyId: facultyId}));
          this.isLoggedIn.next(true);
          return true;
        } else {
          return false;
        }
      })
    );
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

  public getFacultiesIfRoleStudyMethod() {
    if (this.hasRole(String(UserRole.ROLE_NAVCH_METHOD), this.getToken())) {
      this.http.get(`${environment.apiUrl}/faculties`, {headers: {Authorization: this.getToken()}}).subscribe((faculties: Faculty[]) => {
        this.facultiesProvider.next(faculties);
      });
    }
  }

  public hasRole(roleName: string, token: string): boolean {
    try {
      const roles: Array<string> = JSON.parse(atob(token.split('.')[1]))['rol'];
      return !!roles.find(role => role === roleName);
    } catch (e) {
      return false;
    }
  }
}
