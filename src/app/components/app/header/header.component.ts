import { Component } from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {CurrentUserService} from '../../../services/auth/current-user.service';
import {UserRole} from '../../../models/UserRole.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public loggedIn: any;
  userName;

  public constructor(private auth: AuthenticationService,
                     private currentUserService: CurrentUserService) {
    this.auth.isLoggedIn.subscribe(islogged => {this.loggedIn = islogged});
    this.userName = this.currentUserService.name();
  }

  logout() {
    this.auth.logout();
  }

  hasRoleAdmin(): boolean {
    return this.auth.hasRole(String(UserRole.ROLE_ADMIN), this.auth.getToken());
  }
}
