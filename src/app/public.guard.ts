import { CanLoad, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const publicGuard: CanMatchFn = (route, state): boolean | Observable<boolean> => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(auth.isAuthenticated){
    router.navigate(['/products']);
    return false;
  } else {
    return true;
  }
};
