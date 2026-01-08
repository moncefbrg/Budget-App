import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, User } from '../services/auth';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  return authService.getLoggedUser().pipe(
    map((user: User | null) => {
      if (user) {
        return true; // utilisateur connecté → accès autorisé
      } else {
        return router.createUrlTree(['/auth/login']); // pas connecté → redirection
      }
    })
  );
};
