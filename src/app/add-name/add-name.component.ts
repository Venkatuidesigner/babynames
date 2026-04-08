import { Component } from '@angular/core';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.scss']
})
export class AddNameComponent {
  constructor(public ui: UiService) {}
}
