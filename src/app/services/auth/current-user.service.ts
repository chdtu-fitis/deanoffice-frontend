import { Injectable } from '@angular/core';
import { ApplicationUser } from '../../models/ApplicationUser';

@Injectable()
export class CurrentUserService {

  facultyId(): number {
    return this.getUser().facultyId;
  }

  private getUser(): ApplicationUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
