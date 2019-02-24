import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUserService {

  facultyId() {
    return this.getUser().facultyId
  }

  name() {
    return this.getUser().username
  }

  private getUser() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }
}
