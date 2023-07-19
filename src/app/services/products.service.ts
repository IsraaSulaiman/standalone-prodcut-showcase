import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

export interface TransformedProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public GET_PRODUCTS_API =
    'https://api.escuelajs.co/api/v1/products?limit=25&offset=0';
  private GET_PRODUCT_DETAIL_API = 'https://api.escuelajs.co/api/v1/products/';
  private GET_CATEGORIES_API = 'https://api.escuelajs.co/api/v1/categories?limit=5';

  constructor(private http: HttpClient) {}

  private products$ = this.http.get<Product[]>(this.GET_PRODUCTS_API).pipe(
    map((products) =>
      products.map((po) => {
        po.images[0] = po.images[0].replace('https://picsum.photos', '');
        return po;
      })
    ),
    catchError(this.handleError)
  );

  products = toSignal(this.products$);

  selectedProductId = signal<number | undefined>(undefined);

  private productDetail$ = toObservable(this.selectedProductId).pipe(
    filter(Boolean),
    switchMap((productId) => {
      return this.http.get<Product>(this.GET_PRODUCT_DETAIL_API + productId);
    }),
  );

  productDetail = toSignal<Product>(this.productDetail$, {})

  private categories$ = this.http.get<Category[]>(this.GET_CATEGORIES_API).pipe(
    map((cats) =>
      cats.map((cat) => {
        // cat.image = cat.image.replace('https://picsum.photos', '');
        return cat;
      })
    )
  );

  categories = toSignal(this.categories$);

  handleError(err: any) {
    console.log(err, 'err');
    return of(err);
  }
}
