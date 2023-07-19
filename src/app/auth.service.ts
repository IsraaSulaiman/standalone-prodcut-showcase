import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { CookieManagementService } from './cookie-management.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, of, share, shareReplay, switchMap, tap } from 'rxjs';

interface User {
  id: string,
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_API = 'https://api.escuelajs.co/api/v1/auth/login';
  private PROFILE_API = 'https://api.escuelajs.co/api/v1/auth/profile';
  private TK = signal('');
  private REFRESH_TK = '';

  isLoggedIn = signal(false);

  userProfile$ = toObservable(this.TK).pipe(
    switchMap(
      (tk) => {
        console.log('tk', tk)
        if(!tk){
          return of(null)
        }
        return this.http.get<User>(this.PROFILE_API, {
          headers: {
            Authorization: 'Bearer ' + tk,
          },
        });
      },
    ), tap((isLoggedIn) => this.isLoggedIn.set(!!isLoggedIn), shareReplay(1))
  );

  constructor(
    private http: HttpClient,
    private cookieManagement: CookieManagementService
  ) {}

  login(body: { email: string; password: string }) {
    return this.http
      .post<{ access_token: string; refresh_token: string }>(
        this.LOGIN_API,
        body
      )
      .pipe(
        map((data) => {
          this.TK.set(data.access_token);
          this.REFRESH_TK = data.refresh_token;
          this.setCookies();
        })
      );
  }

  logout() {
    this.cookieManagement.deleteAll();
    this.TK.set('');
    this.REFRESH_TK = '';
  }

  setCookies() {
    console.log('set cookies', this.TK());
    this.cookieManagement.setItem('TK', this.TK());
    this.cookieManagement.setItem('REFRESH_TK', this.REFRESH_TK);
  }

  get isAuthenticated() {
    if (this.TK()) {
      return true;
    }
    const TK_COOKIE = this.cookieManagement.getItem('TK');
    console.log(TK_COOKIE, 'tk cookie');
    if (TK_COOKIE) {
      this.TK.update(() => TK_COOKIE);
    }
    return !!TK_COOKIE;
  }

  verifyUser() {
  }
}
