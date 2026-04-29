import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  constructor(public ui: UiService) {}
}
