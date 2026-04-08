import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NamesComponent } from './names/names.component';
import { AddNameComponent } from './add-name/add-name.component';
import { HeaderComponent } from './header/header.component';
import { HomeHeroComponent } from './sections/home-hero/home-hero.component';
import { HomeCategoriesComponent } from './sections/home-categories/home-categories.component';
import { HomeLettersComponent } from './sections/home-letters/home-letters.component';
import { HomePopularComponent } from './sections/home-popular/home-popular.component';
import { HomeBlogComponent } from './sections/home-blog/home-blog.component';
import { HomeAffiliateComponent } from './sections/home-affiliate/home-affiliate.component';
import { HomeTrustComponent } from './sections/home-trust/home-trust.component';
import { HomeCtaComponent } from './sections/home-cta/home-cta.component';
import { SiteFooterComponent } from './sections/site-footer/site-footer.component';
import { AdSlotComponent } from './sections/ad-slot/ad-slot.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { BlogArticleComponent } from './pages/blog-article/blog-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NamesComponent,
    AddNameComponent,
    HeaderComponent,
    HomeHeroComponent,
    HomeCategoriesComponent,
    HomeLettersComponent,
    HomePopularComponent,
    HomeBlogComponent,
    HomeAffiliateComponent,
    HomeTrustComponent,
    HomeCtaComponent,
    SiteFooterComponent,
    AdSlotComponent,
    AboutComponent,
    ContactComponent,
    PrivacyComponent,
    BlogArticleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
