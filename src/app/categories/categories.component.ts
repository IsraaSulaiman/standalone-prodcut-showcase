import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoryComponent } from './category/category.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoryComponent, NgFor, NgIf],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  constructor(private _service: ProductsService) {}

  categories = computed(() => {
    return this._service.categories();
  });
}
