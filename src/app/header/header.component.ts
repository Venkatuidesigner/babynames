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

  constructor(public ui: UiService) {}

  getThemeLabel(option: ThemeOption): string {
    return this.ui.language === 'ta' ? option.labelTa : option.labelEn;
  }
}
