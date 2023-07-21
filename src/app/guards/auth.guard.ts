import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): boolean | Observable<boolean> => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.isAuthenticated) {
    return auth.getUserData().pipe(map(data => {
      if (data && data?.id) {
        // console.log(data, 'yes data');
        return true;
      } else {
        // console.log('no data');
        return false;
      }
    }))
  }
  // console.log('login');
  router.navigate(['/login']);
  return false;
};
