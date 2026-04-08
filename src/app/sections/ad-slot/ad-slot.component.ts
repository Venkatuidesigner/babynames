import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-slot',
  templateUrl: './ad-slot.component.html',
  styleUrls: ['./ad-slot.component.scss']
})
export class AdSlotComponent {
  @Input() label = 'Sponsored';
  @Input() slot = '0000000000';
}
