# Angular Components

A collection of reusable components designed for use in Frank!Framework projects, based on new proposed FF!Doc designs.

## How to use
Install the package from NPM (coming soon)
```sh
npm install @frankframework/angular-components
```

Then import one of the components that you'd like to use or import the `LibraryModule` into the component(s) that needs to use it.

Import the stylesheet into `styles.scss` using:
```scss
@use '@frankframework/angular-components';
```

### Dark theme
The dark theme is set up to work whenever `<body class="ff-dark-theme">` is present on the HTML document.
But if you'd like to have it work under a custom classname then you should add this to your `styles.scss`:
```scss
body.custom-name {
  @import '@frankframework/angular-components/styles/dark_theme';
}
```
