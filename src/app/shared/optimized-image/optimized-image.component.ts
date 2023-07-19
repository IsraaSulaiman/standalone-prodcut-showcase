import { Component, Input } from '@angular/core';
import {  NgIf, NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './optimized-image.component.html',
  styleUrls: ['./optimized-image.component.scss'],
})
export class OptimizedImageComponent {
  @Input() width = '200';
  @Input() height = '200';
  @Input() loading: "lazy" | "eager" | "auto" = 'eager';
  @Input({
    transform: (value: { image: string; name: string }) => {
      if (value) {
        const src = value.image.replace('https://picsum.photos', '')
        return { src: src, name: value.name };
      }
      return value;
    },
  })
  image!: { src: string; name: string };

  loadDefaultImage(image: any){
    console.log('hhh')
  }
}

