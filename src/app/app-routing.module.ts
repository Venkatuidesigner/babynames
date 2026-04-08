import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NamesComponent } from './names/names.component';
import { AddNameComponent } from './add-name/add-name.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { BlogArticleComponent } from './pages/blog-article/blog-article.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'names', component: NamesComponent },
  { path: 'names/:letter', component: NamesComponent },
  { path: 'add-name', component: AddNameComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'blog/:slug', component: BlogArticleComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
