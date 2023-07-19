import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) :boolean | Observable<boolean> => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (auth.isAuthenticated) {
    console.log(auth.isAuthenticated, 'isAuthenticated')
    return auth.userProfile$.pipe(
      map((data) => {
        console.log(data, 'data')
        if (data && data.id) {
          return true;
        } else return false;
      })
    );
  }
  router.navigate(['/login']);
  return false;
};
