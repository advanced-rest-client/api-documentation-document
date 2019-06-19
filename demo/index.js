import { html, render } from 'lit-html';
import { LitElement } from 'lit-element';
import { ApiDemoPageBase } from '@advanced-rest-client/arc-demo-helper/ApiDemoPage.js';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import '@api-components/raml-aware/raml-aware.js';
import '@api-components/api-navigation/api-navigation.js';
import '../api-documentation-document.js';

class DemoElement extends AmfHelperMixin(LitElement) {}
window.customElements.define('demo-element', DemoElement);

class ApiDemo extends ApiDemoPageBase {
  constructor() {
    super();
    this.docsOpened = true;
    this.endpointsOpened = false;
  }

  get hasData() {
    return this._hasData;
  }

  set hasData(value) {
    this._setObservableProperty('hasData', value);
  }

  get doc() {
    return this._doc;
  }

  set doc(value) {
    this._setObservableProperty('doc', value);
  }

  get helper() {
    return document.getElementById('helper');
  }

  _navChanged(e) {
    const { selected, type } = e.detail;

    if (type === 'documentation') {
      this.setData(selected);
    } else {
      this.hasData = false;
    }
  }

  setData(id) {
    const helper = this.helper;
    const encodes = helper._computeEncodes(this.amf);
    const encode = encodes instanceof Array ? encodes[0] : encodes;
    if (encode['@id'] === id) {
      // For Documentation fragment
      this.doc = encode;
    } else {
      const key = helper._getAmfKey(helper.ns.schema.doc);
      let docs = helper._ensureArray(encode[key]);
      this.doc = docs.find((item) => item['@id'] === id);
    }
    this.hasData = true;
  }

  _apiListTemplate() {
    return html`
    <paper-item data-src="demo-api.json">Demo api</paper-item>
    <paper-item data-src="demo-api-compact.json">Demo api - compact version</paper-item>
    <paper-item data-src="demo-document.json">Documentation fragment</paper-item>
    <paper-item data-src="demo-document-compact.json">Documentation fragment - compact version</paper-item>`;
  }

  render() {
    const { amf, doc } = this;
    render(html `
    ${this.headerTemplate()}
    <raml-aware .api="${this.amf}" scope="model"></raml-aware>
    <section role="main" class="centered card">
      ${this._apiNavigationTemplate()}
      ${this.hasData ?
        html`<api-documentation-document .amf="${amf}" .shape="${doc}"></api-documentation-document>` :
        html`<p>Select a Documentation in the navigation to see the demo.</p>`}
    </section>
    <demo-element id="helper" .amf="${this.amf}"></demo-element>`, document.querySelector('#demo'));
  }
}
const instance = new ApiDemo();
instance.render();
window._demo = instance;
