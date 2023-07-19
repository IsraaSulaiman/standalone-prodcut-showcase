import { Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { authGuard } from '../guards/auth.guard';
import { publicGuard } from '../guards/public.guard';
export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [publicGuard],
    pathMatch: 'full',
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadChildren: () => import('./products.routes').then(m => m.routes),
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('../auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('../profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('../cart/cart-detail/cart-detail.component').then(m => m.CartDetailComponent)
  }
];
