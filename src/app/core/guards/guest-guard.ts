import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, User } from '../services/auth';
import { map } from 'rxjs/operators';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(Auth);

  return authService.getLoggedUser().pipe(
  map((user: User | null) => {
    if (!user) return true;          // accès autorisé aux non-connectés
    else return router.createUrlTree(['/home']); // connecté → redirection
  })
);

};

