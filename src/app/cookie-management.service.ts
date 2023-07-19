import { Inject, Injectable, Optional } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieManagementService {
  cookies: { [key: string]: string | null } = {};
  constructor(
    @Optional() @Inject(Request) private req: any,
    @Optional() @Inject(Response) private res: any,
    private cookie: CookieService
  ) {
    if (this.req !== null) {
      this.cookies = this.req.cookies;
    } else if (document) {
      this.cookies = this.cookie.getAll();
    }
  }

  getItem(name: string): string | null {
    const cookies = this.cookies ? this.cookies : this._getPairs();
    if (cookies) {
      if (name && typeof this.cookies[name] !== 'undefined') {
        return this.cookies[name];
      }
    }
    return null;
  }

  setItem(name: string, value: string, expiry?: Date | string): boolean {
    if (!name) {
      return false;
    }
    if (this.req === null) {
      this.cookie.set(name, value);
    } else {
      this.cookies[name] = value;
      this.res.cookie(name, value);
    }
    return true;
  }

  removeItem(name: string): boolean {
    if (this.req !== null || !name) {
      return false;
    }
    if (this.cookies) {
      this.cookies[name] = null;
    }
    if (this.req === null) {
      this.cookie.delete(name);
    } else {
      const expiry = new Date('Thu, 01 Jan 1970 00:00:00 UTC');
      this.res.cookie(name, null, { expires: expiry });
    }
    return true;
  }

  _getPairs(): { [key: string]: string | null } {
    if (this.req === null) {
      return this.cookie.getAll();
    } else {
      return this.cookies;
    }
  }

  deleteAll(){
    if(document) {
      this.cookie.deleteAll()
    }
    this.cookies = {};
  }
}
