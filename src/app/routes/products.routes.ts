import { Routes } from '@angular/router';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { authGuard } from '../guards/auth.guard';

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
