import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieManagementService } from '../services/cookie-management.service';

export default function AppHttpInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const cookieManagement = inject(CookieManagementService);

  const TK = cookieManagement.getItem('TK');
  if (TK)
    return next(
      req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + TK,
        },
      })
    );
  else 
  return next(req);
}