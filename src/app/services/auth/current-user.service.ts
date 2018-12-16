import {Injectable} from '@angular/core';

@Injectable()
export class CurrentUserService {

  facultyId() {
    return this.getUser().facultyId
  }

  private getUser() {
    return JSON.parse(localStorage.getItem('currentUser'))
  }
}
