import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { authGuard } from './auth.guard';
import { publicGuard } from './public.guard';
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
    loadChildren: () => import('./products/products.routes').then(m => m.routes),
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  }
];
