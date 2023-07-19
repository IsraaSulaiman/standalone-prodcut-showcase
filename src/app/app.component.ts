import { Component } from '@angular/core';
import { provideImgixLoader } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { withInterceptors } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  providers: [provideImgixLoader('https://picsum.photos/')],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'standalone-prodcut-showcase';
}
