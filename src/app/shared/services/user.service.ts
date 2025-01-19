import { Injectable } from '@angular/core';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userKey = 'selectedUser';

  setUser(user: User) {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    const user = sessionStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    sessionStorage.removeItem(this.userKey);
  }
}
