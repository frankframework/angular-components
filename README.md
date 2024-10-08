# Angular Components

A collection of reusable (small) components based on the new proposed Frank!Doc designs.

![frank-framework-github-banner](banner.png)

## Available Components
| Component | Selector | Description
| ---       | ---      | ---
| [Alert](/projects/angular-components/src/lib/alert/) | &lt;ff-alert&gt; | Alert the user, useful for forms, documentation or to give a warning for anything.
| [Button](/projects/angular-components/src/lib/button/) | &lt;ff-button&gt; | Buttons that fit the FF style & can have a toggleable active state
| [Chip](/projects/angular-components/src/lib/chip/) | &lt;ff-chip&gt; | A stylized border around a word or short text, most likely used for labeling
| [Search](/projects/angular-components/src/lib/search/) | &lt;ff-search&gt; | A search field that works like any other form input but doesn't need to be in a form

## How to use
Install the package from NPM (coming soon)
```sh
npm install @frankframework/angular-components
```

Then import one of the components that you'd like to use or import the `LibraryModule` into the component(s) that needs to use it.

Import the stylesheet into `styles.scss` using:
```scss
@use '~@frankframework/angular-components';
```

### Dark theme
The dark theme is set up to work whenever `<body class="ff-dark-theme">` is present on the HTML document.
But if you'd like to have it work under a custom classname then you should add this to your `styles.scss`:
```scss
body.custom-name {
  @import '@frankframework/angular-components/styles/dark_theme';
}
```

## Development
See the [template description](https://github.com/frankframework/angular-library-template) and the [Angular CLI documentation](https://angular.dev/tools/cli) for more information.

### Build
Run `npm run build` to build the library project using ng-packagr. The build artifacts will be stored in the `dist/angular-components/` directory.

### Publishing
Run `npm publish` in the `dist/angular-components/` directory in order to publish the library to a package registry.
