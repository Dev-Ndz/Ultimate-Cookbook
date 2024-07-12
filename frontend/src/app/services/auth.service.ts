import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
          console.log(data);
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
  }

  getToken(): string | null {
    return localStorage.getItem('JWT_TOKEN');
  }
}
