import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../../ui.service';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent {
  slug = '';

  constructor(private route: ActivatedRoute, private seo: SeoService, public ui: UiService) {
    this.slug = this.route.snapshot.paramMap.get('slug') || 'tamil-baby-names';
    const title = this.slug
      .split('-')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    this.seo.update({
      title: `${title || 'Meaningful Tamil Baby Names'} | Tamil Baby Names Blog`,
      description:
        'Read practical guidance on choosing meaningful Tamil baby names, understanding cultural roots, and balancing tradition with modern usage.',
      path: `/blog/${this.slug}`,
      type: 'article',
      keywords: 'Tamil baby names blog, Tamil name meanings, choosing Tamil baby names, baby name guide',
      structuredData: {
        '@type': 'Article',
        headline: title || 'Meaningful Tamil Baby Names',
        description:
          'A Tamil baby names guide with cultural context, naming tips, and popular name ideas for families.',
        author: {
          '@type': 'Organization',
          name: 'Tamil Baby Names'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Tamil Baby Names'
        },
        dateModified: '2026-04-29'
      }
    });
  }
}
