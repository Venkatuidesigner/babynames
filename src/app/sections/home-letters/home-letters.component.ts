import { Component, Input } from '@angular/core';
import { UiService } from '../../ui.service';

interface LetterItem {
  tamil: string;
  slug: string;
  label: string;
}

@Component({
  selector: 'app-home-letters',
  templateUrl: './home-letters.component.html',
  styleUrls: ['./home-letters.component.scss']
})
export class HomeLettersComponent {
  @Input() letters: LetterItem[] = [];
  constructor(public ui: UiService) {}
}
