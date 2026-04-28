import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss']
})
export class BlogArticleComponent {
  slug = '';

  constructor(private route: ActivatedRoute, public ui: UiService) {
    this.slug = this.route.snapshot.paramMap.get('slug') || 'tamil-baby-names';
  }
}
