import { Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { authGuard } from '../auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    canActivate: [authGuard],
    component: ProductDetailComponent,
  },
];
