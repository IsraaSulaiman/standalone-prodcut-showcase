import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Product, TransformedProduct } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { OptimizedImageComponent } from 'src/app/shared/optimized-image/optimized-image.component';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [OptimizedImageComponent, NgIf, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {
  @Input({
    transform: (
      product: Product | undefined
    ): TransformedProduct | undefined => {
      if (product) {
        return {
          name: product.title,
          image: product.images[0],
          id: product.id,
          price: product.price,
          description: product.description,
          category: product.category,
        };
      }
      return product;
    },
  })
  product: TransformedProduct | undefined;

  addToCart() {}
}
