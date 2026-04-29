import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent {
  constructor(public ui: UiService) {}
}
