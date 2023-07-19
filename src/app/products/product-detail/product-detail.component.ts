import { Component, Input, computed } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductItemComponent, NgIf],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() set id(value: string){
    if(value){
      this.productsService.selectedProductId.set(Number(value))
    }
  }

  constructor(private productsService: ProductsService){}

  productId = computed(() => {
    return this.productsService.selectedProductId();
  })

  productDetails = computed(() => {
    return this.productsService.productDetail();
  })

}
