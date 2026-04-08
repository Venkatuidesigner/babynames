import { Component, Input } from '@angular/core';

interface BlogItem {
  title: string;
  excerpt: string;
  readTime: string;
}

@Component({
  selector: 'app-home-blog',
  templateUrl: './home-blog.component.html',
  styleUrls: ['./home-blog.component.scss']
})
export class HomeBlogComponent {
  @Input() posts: BlogItem[] = [];
}
