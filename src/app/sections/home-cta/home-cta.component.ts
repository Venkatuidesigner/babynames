import { Component, Input } from '@angular/core';

interface CtaContent {
  title: string;
  subtitle: string;
  button: string;
}

@Component({
  selector: 'app-home-cta',
  templateUrl: './home-cta.component.html',
  styleUrls: ['./home-cta.component.scss']
})
export class HomeCtaComponent {
  @Input() content!: CtaContent;
}
