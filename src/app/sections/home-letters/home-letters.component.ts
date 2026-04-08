import { Component, Input } from '@angular/core';

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
}
