import { AfterViewInit, Component, Input } from '@angular/core';
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from '../../seo.config';
import { UiService } from '../../ui.service';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

@Component({
  selector: 'app-ad-slot',
  templateUrl: './ad-slot.component.html',
  styleUrls: ['./ad-slot.component.scss']
})
export class AdSlotComponent implements AfterViewInit {
  @Input() label = 'Advertisement';
  @Input() slot = '0000000000';
  @Input() format = 'auto';
  @Input() layout = '';
  @Input() responsive = true;
  readonly client = ADSENSE_CLIENT;
  readonly enabled = ADSENSE_ENABLED;

  constructor(public ui: UiService) {}

  ngAfterViewInit(): void {
    if (!this.enabled || typeof window === 'undefined') {
      return;
    }

    this.loadAdsenseScript();
    window.setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ad blockers or delayed AdSense loading should not affect the page.
      }
    });
  }

  private loadAdsenseScript(): void {
    const scriptId = 'adsense-script';
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.client}`;
    document.head.appendChild(script);
  }
}
