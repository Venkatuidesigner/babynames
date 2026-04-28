import { Component, Input } from '@angular/core';
import { UiService } from '../../ui.service';

interface AffiliateItem {
  title: string;
  description: string;
  link: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-home-affiliate',
  templateUrl: './home-affiliate.component.html',
  styleUrls: ['./home-affiliate.component.scss']
})
export class HomeAffiliateComponent {
  @Input() items: AffiliateItem[] = [];
  constructor(public ui: UiService) {}
}
