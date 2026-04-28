import { Component, Input } from '@angular/core';
import { UiService } from '../../ui.service';

interface CategoryItem {
  title: string;
  description: string;
  slug: string;
  icon?: string;
}

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss']
})
export class HomeCategoriesComponent {
  @Input() categories: CategoryItem[] = [];
  constructor(public ui: UiService) {}
}
