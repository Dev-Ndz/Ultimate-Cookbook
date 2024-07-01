import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = localStorage.getItem('JWT_TOKEN');
  const router = inject(Router);
  const authService = inject(AuthService);
  let cloned;
  if (jwtToken) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  } else {
    cloned = req.clone();
  }

  return next(cloned).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401 || e.status === 403) {
        // This would do the navigation
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => e);
    })
  );
};
