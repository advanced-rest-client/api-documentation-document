import { html } from 'lit-html';
import { ApiDemoPage } from '@advanced-rest-client/arc-demo-helper';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '../api-documentation-document.js';

class ApiDemo extends ApiDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'doc'
    ]);
    this.docsOpened = true;
    this.endpointsOpened = false;
    
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
    const encodes = this._computeEncodes(this.amf);
    const encode = Array.isArray(encodes) ? encodes[0] : encodes;
    if (encode['@id'] === id) {
      // For Documentation fragment
      this.doc = encode;
    } else {
      const key = this._getAmfKey(this.ns.schema.doc);
      const docs = this._ensureArray(encode[key]);
      this.doc = docs.find((item) => item['@id'] === id);
    }
    this.hasData = true;
  }

  _apiListTemplate() {
    return [
      ['demo-api', 'Demo API'],
      ['demo-document', 'Document fragment'],
    ].map(([file, label]) => html`
      <anypoint-item data-src="${file}-compact.json">${label} - compact model</anypoint-item>
      <anypoint-item data-src="${file}.json">${label}</anypoint-item>
    `);
  }

  contentTemplate() {
    const { amf, doc } = this;
    return html`
      ${this.hasData ?
        html`<api-documentation-document .amf="${amf}" .shape="${doc}"></api-documentation-document>` :
        html`<p>Select a Documentation in the navigation to see the demo.</p>`}
    `;
  }
}
const instance = new ApiDemo();
instance.render();
window._demo = instance;
