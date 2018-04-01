import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loggedIn: any;

  public constructor(private auth: AuthenticationService){
    this.auth.isLoggedIn.subscribe(islogged => {
      this.loggedIn = islogged
    })
  }

  logout(){
    this.auth.logout()
  }

  ngOnInit() {
  }

}
