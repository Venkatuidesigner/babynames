export const SITE_NAME = 'Tamil Baby Names';
export const SITE_URL = 'https://tamilbabynames.com';
export const SITE_IMAGE = `${SITE_URL}/assets/og-image.svg`;
export const SITE_EMAIL = 'hello@tamilbabynames.com';
export const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXX';
export const ADSENSE_ENABLED = !ADSENSE_CLIENT.includes('XXXXXXXX');

export interface SeoData {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export const DEFAULT_SEO: SeoData = {
  title: 'Tamil Baby Names with Meaning | Baby Name Finder',
  description:
    'Find meaningful Tamil baby names for boys and girls with pronunciation, cultural context, and easy browsing by starting letter.',
  path: '/',
  keywords:
    'Tamil baby names, baby names with meaning, Tamil girl names, Tamil boy names, modern Tamil names, traditional Tamil names',
  type: 'website'
};
