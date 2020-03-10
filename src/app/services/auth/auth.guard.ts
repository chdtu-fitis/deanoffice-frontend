import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from './authentication.service';
import {UserRole} from '../../models/UserRole.enum';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (!localStorage.getItem('currentUser')) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}

@Injectable()
export class AdministrationGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthenticationService,
              ) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.hasRole(String(UserRole.ROLE_ADMIN), this.auth.getToken());
  }

}
