import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {CurrentUserService} from '../../../services/auth/current-user.service';
import {UserRole} from '../../../models/UserRole.enum';
import {Globals} from "../../shared/globals";
import {Faculty} from "../../../models/Faculty";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedIn: any;
  userName;
  faculties: Faculty[] = [];

  public constructor(private auth: AuthenticationService,
                     private currentUserService: CurrentUserService) {
    this.auth.isLoggedIn.subscribe(islogged => {
      this.loggedIn = islogged;
      this.userName = this.currentUserService.name();
    });
  }

  ngOnInit(): void {
    const localStorageFaculties = JSON.parse(localStorage.getItem('faculties'));
    if (localStorageFaculties && localStorageFaculties.length > 0) {
      this.faculties = localStorageFaculties;
      if (this.faculties && this.faculties[0]) Globals.studyMethodDptCurrentFacultyId = String(this.faculties[0].id);
    } else {
      this.auth.facultiesProvider.subscribe(faculties => {
        if (faculties && faculties.length > 0) {
          this.faculties = faculties;
          localStorage.setItem('faculties', JSON.stringify(faculties));
          Globals.studyMethodDptCurrentFacultyId = String(this.faculties[0].id)
        }
      })
    }
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
