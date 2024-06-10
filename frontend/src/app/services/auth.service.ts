import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post('https://ultimate-cookbook-8beb64e72401.herokuapp.com/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
        })
      );
  }

  isLoggedIn() {
    return !!localStorage.getItem('JWT_TOKEN');
  }

  register(name: string, email: string, password: string) {
    return this.http
      .post('https://ultimate-cookbook-8beb64e72401.herokuapp.com/auth/login', {
        name,
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
        })
      );
  }
}
