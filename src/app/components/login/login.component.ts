import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  ngOnInit() {
    this.authenticationService.logout();
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        }
        this.authenticationService.getFacultiesIfRoleStudyMethod();
      }, err => {
        this.error = 'Ім\'я користувача чи пароль неправильні';
        this.loading = false;
      });
  }
}
