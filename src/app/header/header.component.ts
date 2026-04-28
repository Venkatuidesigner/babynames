import { Component } from '@angular/core';
import { UiService } from '../ui.service';

type ThemeOption = {
  value: 'light' | 'pink' | 'blue' | 'yellow' | 'midnight';
  labelTa: string;
  labelEn: string;
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  themeOptions: ThemeOption[] = [
    { value: 'light', labelTa: 'ஒளி', labelEn: 'Light' },
    { value: 'pink', labelTa: 'பிங்க்', labelEn: 'Pink' },
    { value: 'blue', labelTa: 'நீலம்', labelEn: 'Blue' },
    { value: 'yellow', labelTa: 'மஞ்சள்', labelEn: 'Yellow' },
    { value: 'midnight', labelTa: 'இரவு', labelEn: 'Midnight' }
  ];

  constructor(public ui: UiService) {}

  getThemeLabel(option: ThemeOption): string {
    return this.ui.language === 'ta' ? option.labelTa : option.labelEn;
  }
}
