import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userKey = 'selectedUser';
  private defaultUser: User = { name: '' };
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.getUserFromStorage());

  setUser(user: User) {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private getUserFromStorage() {
    const user = sessionStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    sessionStorage.removeItem(this.userKey);
    this.userSubject.next(this.defaultUser);
  }
}
