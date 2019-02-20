import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/marked-element/marked-element.js';
import '@advanced-rest-client/markdown-styles/markdown-styles.js';
import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `api-documentation-document`
 *
 * A component to render documentation node of the AMF model
 *
 * ## Styling
 *
 * `<api-documentation-document>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--arc-font-headline` | Mixin applied to header elmeent | `{}`
 *
 * Markdown styles are defined in `advanced-rest-client/markdown-styles`.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin AmfHelperMixin
 */
class ApiDocumentationDocument extends AmfHelperMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style>
    :host {
      display: block;
    }

    h1 {
      @apply --arc-font-headline;
    }
    </style>
    <div id="preview">
      <template is="dom-if" if="[[hasTitle]]">
        <h1>[[title]]</h1>
      </template>
      <marked-element markdown="[[content]]">
        <div slot="markdown-html" class="markdown-body"></div>
      </marked-element>
    </div>
`;
  }

  static get is() {
    return 'api-documentation-document';
  }
  static get properties() {
    return {
      /**
       * A Document to render.
       * It is a value from `http://schema.org/documentation` of AMF
       * API data model.
       */
      apiDocument: Object,
      /**
       * Computed value of the title of the documentation.
       * Might be undefined.
       */
      title: {
        type: String,
        computed: '_computeTitle(apiDocument, amfModel)'
      },
      /**
       * Computed value, true if `title` is set.
       */
      hasTitle: {
        type: Boolean,
        computed: '_computeHasTitle(title)'
      },
      /**
       * Computed value of content of documentation.
       */
      content: {
        type: String,
        computed: '_computeContent(apiDocument, amfModel)'
      }
    };
  }
  /**
   * Computes value for `title` property.
   *
   * @param {Object} doc AMF's `http://schema.org/documentation` entry
   * @return {String|undefined}
   */
  _computeTitle(doc) {
    return this._getValue(doc, this.ns.schema.title);
  }
  /**
   * Computes value for `hasTitle` property
   *
   * @param {?String} title
   * @return {Boolean}
   */
  _computeHasTitle(title) {
    return !!title;
  }
  /**
   * Computes value for `content` property.
   *
   * @param {Object} doc AMF's `http://schema.org/documentation` entry
   * @return {String|undefined}
   */
  _computeContent(doc) {
    return this._getValue(doc, this.ns.schema.desc);
  }
}
window.customElements.define(ApiDocumentationDocument.is, ApiDocumentationDocument);
