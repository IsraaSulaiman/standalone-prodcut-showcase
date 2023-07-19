import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe, NgFor } from '@angular/common';
import {
  navLinksForNonRegistered,
  navLinksForRegistered,
} from '../constants/navLinks';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, JsonPipe, NgFor, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  auth = inject(AuthService);
  router = inject(Router);

  userProfile = toSignal(this.auth.userProfile$);
  isLoggedIn = this.auth.isLoggedIn;

  navLinks = computed(() => {
    console.log('computed')
    if (this.isLoggedIn()) {
      return navLinksForRegistered;
    } else {
      return navLinksForNonRegistered;
    }
  });

  handleNavigation(item: any){
    if(item.isLogout){
      this.auth.logout();
      this.router.navigate(['/login'])
    }
  }
}
