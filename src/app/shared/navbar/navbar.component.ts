import { ChangeDetectionStrategy, Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import {
  navLinksForNonRegistered,
  navLinksForRegistered,
} from '../../constants/navLinks';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, JsonPipe, NgFor, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  auth = inject(AuthService);
  router = inject(Router);
  
  isLoggedIn = this.auth.isLoggedIn;

  navLinks$ = toObservable(this.isLoggedIn).pipe(switchMap(val => {
    return of(!val ? navLinksForNonRegistered : navLinksForRegistered)
  }))

  navLinks = toSignal(this.navLinks$, {initialValue: [] as any[]});

  userProfile = this.auth.userProfile;

  handleNavigation(item: any){
    if(item.isLogout){
      this.auth.logout();
      this.router.navigate(['/login'])
    }
  }
}
function asObservable(isLoggedIn: WritableSignal<boolean>) {
  throw new Error('Function not implemented.');
}

