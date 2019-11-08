import { LitElement, html, css } from 'lit-element';
import { AmfHelperMixin } from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import markdownStyles from '@advanced-rest-client/markdown-styles/markdown-styles.js';
import '@advanced-rest-client/arc-marked/arc-marked.js';
/**
 * `api-documentation-document`
 *
 * A component to render documentation node of the AMF model
 *
 * Markdown styles are defined in `advanced-rest-client/markdown-styles`.
 *
 * @customElement
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin AmfHelperMixin
 */
class ApiDocumentationDocument extends AmfHelperMixin(LitElement) {
  get styles() {
    return [
      markdownStyles,
      css`:host {
        display: block;
      }

      h1 {
        font-size: var(--arc-font-headline-font-size);
        font-weight: var(--arc-font-headline-font-weight);
        letter-spacing: var(--arc-font-headline-letter-spacing);
        line-height: var(--arc-font-headline-line-height);
      }

      arc-marked {
        background-color: transparent;
        padding: 0;
      }`
    ];
  }

  render() {
    const { _title: title, _content: content } = this;
    const hasTitle = !!title;
    return html`<style>${this.styles}</style>
    <div id="preview">
      ${hasTitle ? html`<h1>${title}</h1>` : undefined}
      <arc-marked .markdown="${content}" sanitize @click="${this._clickHandler}">
        <div slot="markdown-html" part="markdown-html" class="markdown-html"></div>
      </arc-marked>
    </div>`;
  }

  static get properties() {
    return {
      /**
       * A Document to render.
       * Represents AMF's shape for document.
       */
      shape: { type: Object },
      /**
       * Computed value of the title of the documentation.
       * Might be undefined.
       */
      _title: { type: String },
      /**
       * Computed value of content of documentation.
       */
      _content: { type: String }
    };
  }

  get shape() {
    return this._shape;
  }

  set shape(value) {
    const old = this._shape;
    if (old === value) {
      return;
    }
    this._shape = value;
    this.requestUpdate('shape', old);
    this._shapeChanged(value);
  }

  __amfChanged() {
    this._shapeChanged(this.shape);
  }
  /**
   * Computes `title` and `content` properties when `shape` changes.
   * @param {Object} shape Value of the `shape` attrribute
   */
  _shapeChanged(shape) {
    this._title = this._getValue(shape, this.ns.aml.vocabularies.core.title);
    this._content = this._getValue(shape, this.ns.aml.vocabularies.core.description);
  }
  /**
   * At current state there's no way to tell where to navigate when relative
   * link is clicked. To prevent 404 anchores this prevents any relative link click.
   * @param {Event} e
   */
  _clickHandler(e) {
    const { target } = e;
    if (target.localName !== 'a') {
      return;
    }
    // target.href is always absolute, need attribute value to test for
    // relative links.
    const href = target.getAttribute('href');
    const ch0 = href[0];
    if (['.', '/'].indexOf(ch0) !== -1) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
window.customElements.define('api-documentation-document', ApiDocumentationDocument);
