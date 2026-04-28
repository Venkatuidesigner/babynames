import { Component } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  constructor(public ui: UiService) {}
}
