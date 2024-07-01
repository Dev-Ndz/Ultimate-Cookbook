import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login = (event: Event) => {
    this.authService
      .login(this.email, this.password)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error.message || 'An unexpected error occurred';
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        console.log('redirecting from login');
        this.router.navigate(['/']);
      });
  };
}
