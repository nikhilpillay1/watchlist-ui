import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userKey = 'selectedUser';
  private defaultUser = '';
  private userSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.getUserFromStorage());

  setUser(user: string) {
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
