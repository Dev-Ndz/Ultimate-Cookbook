import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    return this.http
      .post(
        'https://ultimate-cookbook-8beb64e72401.herokuapp.com/auth/register',
        {
          name,
          email,
          password,
        }
      )
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post('https://ultimate-cookbook-8beb64e72401.herokuapp.com/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((data: any) => {
          localStorage.setItem('JWT_TOKEN', data.token);
          console.log(data);
        })
      );
  }

  isLoggedIn() {
    return !!localStorage.getItem('JWT_TOKEN');
  }

  logout(): void {
    localStorage.removeItem('JWT_TOKEN');
  }

  getToken(): string | null {
    return localStorage.getItem('JWT_TOKEN');
  }
}
