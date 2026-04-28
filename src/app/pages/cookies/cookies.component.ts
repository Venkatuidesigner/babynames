import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent {
  constructor(
    private title: Title,
    private meta: Meta,
    public ui: UiService
  ) {
    this.title.setTitle('Cookie Policy | Tamil Baby Names');
    this.meta.updateTag({
      name: 'description',
      content: 'Read how Tamil Baby Names uses cookies, advertising cookies, analytics, and consent-related settings.'
    });
  }
}
