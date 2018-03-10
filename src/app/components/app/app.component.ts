import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private loggedIn: any;

  public constructor(private auth: AuthenticationService){
    this.auth.isLoggedIn.subscribe(islogged => {
      this.loggedIn = islogged
    })
  }

  logout(){
    this.auth.logout()
  }
}
