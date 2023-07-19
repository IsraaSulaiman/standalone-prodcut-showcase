import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  meta = inject(Meta);
  title = inject(Title);


  setSeoTags(page: string) {
    this.title.setTitle('Welcome to page: ' + page);
    //an api to get tags for a specific page
    this.meta.addTags([
      {
        name: 'keywords',
        content: 'SEO for this page: ' + page + ' and its keywords',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Digamber Singh' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }
}

