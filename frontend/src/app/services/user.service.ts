import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    let user: User;
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user = JSON.parse(storedUser);
      return user;
    } else {
      return { id: '', name: '', email: '' };
    }
  }
  clearUser() {
    localStorage.removeItem('user');
  }
}
