import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor(public ui: UiService) {}
}
