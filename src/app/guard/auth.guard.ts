import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // o login nao usa o guard
  if (state.url === '/admin/login') {
    return true;
  }

  if (authService.isTokenExpired()) {
    authService.removeToken();
    authService.removeUsuarioLogado();

    router.navigate(['/admin/login']);
    return false;
  }

  // permite a navegacao
  return true;
};
