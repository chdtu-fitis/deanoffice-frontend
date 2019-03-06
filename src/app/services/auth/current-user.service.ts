import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUserService {

  facultyId() {
    return this.getUser().facultyId
  }

  name() {
    const user = this.getUser();
    if (user) {
      return user.username
    }
  }

  private getUser() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }
}
