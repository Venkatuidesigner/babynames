import { Component, Input } from '@angular/core';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-ad-slot',
  templateUrl: './ad-slot.component.html',
  styleUrls: ['./ad-slot.component.scss']
})
export class AdSlotComponent {
  @Input() label = 'Advertisement';
  @Input() slot = '0000000000';
  constructor(public ui: UiService) {}
}
