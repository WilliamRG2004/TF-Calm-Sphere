import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);

  const isAuthenticated = lService.verificar();
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(sessionStorage.getItem('user')!);
  const roles: string[] = user?.roles || [];

  const requiredRole = route.data['role'];

  if (requiredRole && !roles.includes(requiredRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
