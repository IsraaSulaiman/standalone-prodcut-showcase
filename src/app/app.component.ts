import { Component, inject } from '@angular/core';
import { provideImgixLoader } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  providers: [provideImgixLoader('https://picsum.photos/')],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'standalone-prodcut-showcase';
  router = inject(Router);
  seo = inject(SeoService);

  ngOnInit() {
    this.listenToRouteChange();
  }

  listenToRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const page = event.url.toString().split('/');
        this.seo.setSeoTags(page[1] ? page[1] : 'Home');
      }
    });
  }
}
