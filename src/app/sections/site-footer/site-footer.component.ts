import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {
  year = new Date().getFullYear();

  constructor(public ui: UiService) {}
}
