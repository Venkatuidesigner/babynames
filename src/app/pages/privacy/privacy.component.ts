import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  constructor(public ui: UiService) {}
}
