import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface HeroContent {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  ctaPrimary: string;
  ctaSecondary: string;
  visualBadge: string;
  visuals: { title: string; subtitle: string; image: string }[];
}

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss']
})
export class HomeHeroComponent {
  @Input() content!: HeroContent;
  searchValue = '';

  constructor(private router: Router) {}

  onSearch(): void {
    const query = this.searchValue.trim();
    if (!query) {
      return;
    }
    this.router.navigate(['/names'], { queryParams: { q: query } });
  }
}
