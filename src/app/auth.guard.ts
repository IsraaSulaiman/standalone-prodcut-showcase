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
    return auth.userProfile$().pipe(
      map((data) => {
        if (data && data.id) {
          console.log(data, 'yes data')
          return true;
        } else {
          console.log('no data')
          return false;
        }
      }, (error: any) => {
        console.log(error)
        return false;
      })
    );
  }
  console.log('login')
  router.navigate(['/login']);
  return false;
};