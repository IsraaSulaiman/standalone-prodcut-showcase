import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { CookieManagementService } from './cookie-management.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  filter,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_API = 'https://api.escuelajs.co/api/v1/auth/login';
  private PROFILE_API = 'https://api.escuelajs.co/api/v1/auth/profile';

  isLoggedIn = signal(false);

  getUserData = () => this.http.get<User>(this.PROFILE_API).pipe(tap(() => console.log('get req')));

  userProfile$ = toObservable(this.isLoggedIn).pipe(
    switchMap(() => {
      if (!this.isLoggedIn()) {
        // console.log('no logged in')
        return of({} as User);
      }
      // console.log('logged in')
      return this.getUserData();
    }),
    tap((user: any) => {
      // console.log('herrrrrrrrrrrrrrrrrr', user?.id );
  }), shareReplay(1));

  userProfile = toSignal(this.userProfile$);

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
          this.isLoggedIn.set(true);
          this.setCookies(data);
        })
      );
  }

  logout() {
    this.cookieManagement.deleteAll();
  }

  setCookies(data: {
    access_token: string,
    refresh_token: string
  }) {
    this.cookieManagement.setItem('TK', data.access_token);
    this.cookieManagement.setItem('REFRESH_TK', data.refresh_token);
  }

  get isAuthenticated() {
    const TK_COOKIE = this.cookieManagement.getItem('TK');
    if(TK_COOKIE) {
      this.isLoggedIn.set(true);   
    }
    return !!TK_COOKIE;
  }

}
