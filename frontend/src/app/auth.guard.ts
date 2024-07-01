import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router);
  console.log('AUTH GUARD ! Guarding....');
  if (!authService.isLoggedIn()) {
    console.log('redirecting from authguard');
    routerService.navigate(['login']);

    return false;
  }
  console.log('auth guard : authorize');
  return true;
};
