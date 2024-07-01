import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  validationMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register = (event: Event) => {
    this.authService
      .register(this.name, this.email, this.password)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error.message || 'An unexpected error occurred';
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          this.validationMessage = data.message;
          setInterval(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  };
}
