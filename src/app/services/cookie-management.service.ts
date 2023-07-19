import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import {SsrCookieService} from 'ngx-cookie-service-ssr';
import {Request} from 'express';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable({
  providedIn: 'root',
})
export class CookieManagementService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional()
    @Inject(REQUEST) private request: Request,
    private cookie: SsrCookieService
  ) {  
  }

  getItem(name: string): string | null {
      return this.cookie.get(name);
  }

  setItem(name: string, value: string, expiry?: Date | string) {
    this.cookie.set(name, value);
  }

  removeItem(name: string) {
     this.cookie.delete(name);
  }

  deleteAll() {
    this.cookie.deleteAll();
  }
}
