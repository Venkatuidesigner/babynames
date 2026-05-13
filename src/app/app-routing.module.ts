import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NamesComponent } from './names/names.component';
import { AddNameComponent } from './add-name/add-name.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { BlogArticleComponent } from './pages/blog-article/blog-article.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CookiesComponent } from './pages/cookies/cookies.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      seo: {
        title: 'Tamil Baby Names with Meaning | Baby Name Finder',
        description: 'Discover meaningful Tamil baby names for boys and girls with pronunciation, cultural context, popular picks, and browsing by Tamil letter.',
        path: '/',
        keywords: 'Tamil baby names, Tamil names with meaning, Tamil baby girl names, Tamil baby boy names, modern Tamil names, Tamil names by letter',
        structuredData: [
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I choose a Tamil baby name?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Start with meaning, pronunciation, family tradition, starting letter, and how the name sounds in both Tamil and English.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I search Tamil baby names by letter?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Tamil Baby Names lets families browse names by Tamil starting letters and sounds.'
                }
              },
              {
                '@type': 'Question',
                name: 'Are modern Tamil baby names included?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The collection includes traditional, modern, rare, short, and culturally rooted Tamil baby names.'
                }
              }
            ]
          },
          {
            '@type': 'ItemList',
            name: 'Popular Tamil baby name categories',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Tamil girl names', url: 'https://tamilbabynames.com/names?category=girl' },
              { '@type': 'ListItem', position: 2, name: 'Tamil boy names', url: 'https://tamilbabynames.com/names?category=boy' },
              { '@type': 'ListItem', position: 3, name: 'Modern Tamil names', url: 'https://tamilbabynames.com/names?category=modern' }
            ]
          }
        ]
      }
    }
  },
  { path: 'names', component: NamesComponent },
  { path: 'names/:letter', component: NamesComponent },
  {
    path: 'add-name',
    component: AddNameComponent,
    data: {
      seo: {
        title: 'Suggest a Tamil Baby Name',
        description: 'Share a meaningful Tamil baby name suggestion for review and help families discover culturally rooted names.',
        path: '/add-name'
      }
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      seo: {
        title: 'About Tamil Baby Names',
        description: 'Learn how Tamil Baby Names curates meaningful names with pronunciation, cultural roots, and modern usage notes for families.',
        path: '/about'
      }
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      seo: {
        title: 'Contact Tamil Baby Names',
        description: 'Contact Tamil Baby Names for questions, corrections, name suggestions, advertising, or content feedback.',
        path: '/contact'
      }
    }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {
      seo: {
        title: 'Privacy Policy | Tamil Baby Names',
        description: 'Read the privacy policy for Tamil Baby Names, including Google AdSense, analytics, cookies, and data handling disclosures.',
        path: '/privacy',
        robots: 'noindex, follow'
      }
    }
  },
  {
    path: 'cookies',
    component: CookiesComponent,
    data: {
      seo: {
        title: 'Cookie Policy | Tamil Baby Names',
        description: 'Read how Tamil Baby Names uses cookies, advertising cookies, analytics, consent choices, and browser settings.',
        path: '/cookies',
        robots: 'noindex, follow'
      }
    }
  },
  {
    path: 'terms',
    component: TermsComponent,
    data: {
      seo: {
        title: 'Terms and Conditions | Tamil Baby Names',
        description: 'Read the terms and conditions for using the Tamil Baby Names website, name content, recommendations, and suggestions.',
        path: '/terms',
        robots: 'noindex, follow'
      }
    }
  },
  { path: 'blog/:slug', component: BlogArticleComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
