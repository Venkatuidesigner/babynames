import { Component, Input } from '@angular/core';

interface TrustItem {
  title: string;
  detail: string;
}

@Component({
  selector: 'app-home-trust',
  templateUrl: './home-trust.component.html',
  styleUrls: ['./home-trust.component.scss']
})
export class HomeTrustComponent {
  @Input() items: TrustItem[] = [];
}
