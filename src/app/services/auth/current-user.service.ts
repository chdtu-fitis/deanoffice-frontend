import {Injectable} from '@angular/core';
import {FOREIGN_FACULTY_ID} from "../../components/shared/constant";

@Injectable()
export class CurrentUserService {

  facultyId(): number {
    return this.getUser().facultyId
  }

  isForeignFaculty(): boolean {
    return this.getUser().facultyId == FOREIGN_FACULTY_ID;
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
