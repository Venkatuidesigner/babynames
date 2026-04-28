# BabyNamesSite

A Tamil baby names website built with Angular. The app includes bilingual Tamil and English support, multiple visual themes, name exploration by letter, and static-hosting support for GitHub Pages.

## Features

- Tamil and English language selection
- Five theme options: Light, Pink, Blue, Yellow, and Midnight
- Name browsing by category and starting letter
- Privacy Policy, Cookie Policy, Terms, About, and Contact pages
- GitHub Pages-friendly routing with Angular hash routes

## Local development

Start the development server:

```bash
ng serve
```

Then open:

```txt
http://localhost:4200/
```

The app reloads automatically when source files change.

## Build

Create a production build:

```bash
ng build
```

Build output goes to:

```txt
dist/baby-names-site
```

## GitHub Pages deploy

This project is configured for GitHub Pages using Angular hash routing, so direct links and browser refreshes work correctly on static hosting.

Automatic deploy is configured with GitHub Actions in:

```txt
.github/workflows/deploy-pages.yml
```

Build for GitHub Pages with:

```bash
npm run build:github-pages
```

Then publish:

```txt
dist/baby-names-site
```

Important notes:

- Routes will look like `/#/about`, `/#/privacy`, `/#/names/a`
- This is expected on GitHub Pages and prevents 404 errors on refresh
- If you move to a host with rewrite support later, you can switch away from hash routing
- In GitHub repository settings, set `Pages` source to `GitHub Actions`

## Testing

Run unit tests with:

```bash
ng test
```

## Angular CLI

This project was originally generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.
