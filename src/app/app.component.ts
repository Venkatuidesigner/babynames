import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SeoData } from './seo.config';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeSeo = this.getDeepestRouteSeo();
        if (routeSeo) {
          this.seo.update(routeSeo);
        }
      });
  }

  private getDeepestRouteSeo(): SeoData | null {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }

    return (route?.snapshot.data['seo'] as SeoData | undefined) || null;
  }
}
