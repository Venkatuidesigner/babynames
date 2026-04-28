import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { UiService } from '../../ui.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  constructor(
    private title: Title,
    private meta: Meta,
    public ui: UiService
  ) {
    this.title.setTitle('Terms and Conditions | Tamil Baby Names');
    this.meta.updateTag({
      name: 'description',
      content: 'Read the terms and conditions for using the Tamil Baby Names website, content, and suggestions.'
    });
  }
}
