import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { OptimizedImageComponent } from 'src/app/shared/optimized-image/optimized-image.component';
import { Category } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [OptimizedImageComponent, NgIf],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  @Input() category: Category | undefined;
}
