import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {CurrentUserService} from '../../../services/auth/current-user.service';
import {UserRole} from '../../../models/UserRole.enum';
import {Globals} from "../../shared/globals";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public loggedIn: any;
  userName;
  faculties = [{id:9, abbr: "БФ"}, {id:2, abbr: "ФЕУ"}, {id:1, abbr: "ФІТІС"}, {id:5, abbr: "ФКТМД"}];

  public constructor(private auth: AuthenticationService,
                     private currentUserService: CurrentUserService) {
    this.auth.isLoggedIn.subscribe(islogged => {this.loggedIn = islogged;});
    this.auth.facultiesProvider.subscribe(faculties => {
      this.faculties = faculties;
      if (faculties[0]) Globals.studyMethodDptCurrentFacultyId = faculties[0].id;
    });
    this.userName = this.currentUserService.name();
  }

  logout() {
    this.auth.logout();
  }
  hasRoleAdmin(): boolean {
    return this.auth.hasRole(String(UserRole.ROLE_ADMIN), this.auth.getToken());
  }

    hasRoleNavchMetod() {
      return this.auth.hasRole(String(UserRole.ROLE_NAVCH_METHOD), this.auth.getToken());
    }

    onCurrentFacultyChange(event): void {
      Globals.studyMethodDptCurrentFacultyId = event.target.value;
  }
  }
