import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  register(name: string, email: string, password: string) {
    return this.http
      .post(environment.apiUrl + '/auth/register', {
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

  login(email: string, password: string) {
    return this.http
      .post(environment.apiUrl + '/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
          let user: User = { id: data.id, name: data.name, email: data.email };
          this.userService.setUser(user);
        })
      );
  }

  isLoggedIn() {
    console.log(
      'Checking if user is logged In...',
      !!localStorage.getItem('JWT_TOKEN')
    );
    return !!localStorage.getItem('JWT_TOKEN');
  }

  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
    this.userService.clearUser();
  }

  getToken(): string | null {
    return localStorage.getItem('JWT_TOKEN');
  }
}
