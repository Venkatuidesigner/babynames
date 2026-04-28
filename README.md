# BabyNamesSite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## GitHub Pages Deploy

This project is configured for GitHub Pages using Angular hash routing, so page refreshes and direct links work on static hosting.

Build for GitHub Pages with:

```bash
npm run build:github-pages
```

Then publish the contents of:

```bash
dist/baby-names-site
```

Important notes:

- Routes will look like `/#/about`, `/#/privacy`, `/#/names/a`
- This is expected for GitHub Pages and avoids 404 errors on refresh
- If you use a custom domain with proper server rewrites later, you can switch back from hash routing

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
