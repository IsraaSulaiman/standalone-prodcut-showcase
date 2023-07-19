import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../products.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

  constructor(private _service: ProductsService) {
  }

  products = computed(() => {
    return this._service.products();
  })




}
