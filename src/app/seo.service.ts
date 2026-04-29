import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DEFAULT_SEO, SeoData, SITE_EMAIL, SITE_IMAGE, SITE_NAME, SITE_URL } from './seo.config';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly jsonLdId = 'app-json-ld';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  update(data: SeoData): void {
    const seo = { ...DEFAULT_SEO, ...data };
    const canonicalUrl = this.absoluteUrl(seo.path || '/');
    const imageUrl = seo.image || SITE_IMAGE;
    const pageTitle = seo.title.includes(SITE_NAME) ? seo.title : `${seo.title} | ${SITE_NAME}`;

    this.title.setTitle(pageTitle);
    this.setHtmlLang('en-IN');
    this.setCanonical(canonicalUrl);
    this.setTag('name', 'description', seo.description);
    this.setTag('name', 'keywords', seo.keywords || DEFAULT_SEO.keywords || '');
    this.setTag('name', 'author', SITE_NAME);
    this.setTag('name', 'robots', seo.robots || 'index, follow, max-image-preview:large');
    this.setTag('name', 'theme-color', '#f43f5e');
    this.setTag('property', 'og:site_name', SITE_NAME);
    this.setTag('property', 'og:title', pageTitle);
    this.setTag('property', 'og:description', seo.description);
    this.setTag('property', 'og:type', seo.type === 'article' ? 'article' : 'website');
    this.setTag('property', 'og:url', canonicalUrl);
    this.setTag('property', 'og:image', imageUrl);
    this.setTag('property', 'og:locale', 'en_IN');
    this.setTag('property', 'og:locale:alternate', 'ta_IN');
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', pageTitle);
    this.setTag('name', 'twitter:description', seo.description);
    this.setTag('name', 'twitter:image', imageUrl);

    this.setStructuredData(this.buildStructuredData(seo, canonicalUrl, imageUrl, pageTitle));
  }

  absoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) {
      return path;
    }
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${normalizedPath}`;
  }

  private buildStructuredData(
    seo: SeoData,
    canonicalUrl: string,
    imageUrl: string,
    pageTitle: string
  ): Record<string, unknown> {
    const baseGraph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: SITE_EMAIL,
        logo: imageUrl
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_SEO.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['en-IN', 'ta-IN'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/names?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': seo.type === 'article' ? 'Article' : 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: seo.description,
        image: imageUrl,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['en-IN', 'ta-IN']
      }
    ];

    const extra = Array.isArray(seo.structuredData)
      ? seo.structuredData
      : seo.structuredData
        ? [seo.structuredData]
        : [];

    return {
      '@context': 'https://schema.org',
      '@graph': [...baseGraph, ...extra]
    };
  }

  private setHtmlLang(language: string): void {
    this.document.documentElement.setAttribute('lang', language);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setTag(attribute: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attribute]: key, content }, `${attribute}="${key}"`);
  }

  private setStructuredData(data: Record<string, unknown>): void {
    let script = this.document.getElementById(this.jsonLdId) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = this.jsonLdId;
      this.document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);
  }
}
