# DEPRECATED

This component is being deprecated. The code base has been moved to [api-documentation](https://github.com/advanced-rest-client/api-documentation) module. This module will be archived when [PR 37](https://github.com/advanced-rest-client/api-documentation/pull/37) is merged.

-----

A component to render documentation node of the AMF model

```html
<api-documentation-document amf="{...}" shape="{...}"></api-documentation-document>
```

## Version compatibility

This version only works with AMF model version 2 (AMF parser >= 4.0.0).
For compatibility with previous model version use `3.x.x` version of the component.

## Usage

### Installation

```ssh
npm install --save @api-components/api-documentation-document
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@api-components/api-documentation-document/api-documentation-document.js';
    </script>
  </head>
  <body>
    <api-documentation-document></api-documentation-document>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@api-components/api-documentation-document/api-documentation-document.js';

class SampleElement extends PolymerElement {
  render() {
    return html`
    <api-documentation-document .amf="${this.amf}"></api-documentation-document>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/api-documentation-document
cd api-documentation-document
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
