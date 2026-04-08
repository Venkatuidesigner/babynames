import { Component, Input } from '@angular/core';

interface PopularName {
  name: string;
  meaning: string;
  description: string;
  gender: string;
}

@Component({
  selector: 'app-home-popular',
  templateUrl: './home-popular.component.html',
  styleUrls: ['./home-popular.component.scss']
})
export class HomePopularComponent {
  @Input() names: PopularName[] = [];
}
