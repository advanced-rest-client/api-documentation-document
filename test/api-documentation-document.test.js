import { fixture, assert, html } from '@open-wc/testing';
import sinon from 'sinon';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import { AmfLoader } from './amf-loader.js';
import '../api-documentation-document.js';

/** @typedef {import('../').ApiDocumentationDocumentElement} ApiDocumentationDocumentElement */

describe('<api-documentation-document>', () => {
  /**
   * @param {any} amf
   * @param {any} shape
   * @returns {Promise<ApiDocumentationDocumentElement>}
   */
  async function basicFixture(amf, shape) {
    return fixture(html`<api-documentation-document
      .amf="${amf}"
      .shape="${shape}"></api-documentation-document>`);
  }

  [
    ['Full AMF model', false],
    ['Compact AMF model', true]
  ].forEach(([label, compact]) => {
    describe(String(label), () => {
      describe('Basics', () => {
        let element = /** @type ApiDocumentationDocumentElement */ (null);
        let amf;
        let docs;

        before(async () => {
          amf = await AmfLoader.load(compact);
          docs = AmfLoader.lookupDocumentation(amf, 1);
        });

        beforeEach(async () => {
          element = await basicFixture(amf, docs);
        });

        it('Computes _title', () => {
          assert.equal(element._title, 'About');
        });

        it('Computes _content', () => {
          assert.typeOf(element._content, 'string');
        });

        it('title is rendered', () => {
          const node = element.shadowRoot.querySelector('h1');
          assert.ok(node);
        });

        it('Passes data to "arc-marked"', () => {
          const node = element.shadowRoot.querySelector('arc-marked');
          assert.typeOf(node.markdown, 'string');
        });

        it('Does not call _shapeChanged() when setting the same amf value', () => {
          const spy = sinon.spy(element, '_shapeChanged');
          element.amf = amf;
          assert.isFalse(spy.called);
        });

        it('Does not call _shapeChanged() when setting the same shape value', () => {
          const spy = sinon.spy(element, '_shapeChanged');
          element.shape = docs;
          assert.isFalse(spy.called);
        });
      });

      describe('Navigation', () => {
        let element = /** @type ApiDocumentationDocumentElement */ (null);
        let amf;
        let docs;
        let anchors;

        before(async () => {
          amf = await AmfLoader.load(compact);
          docs = AmfLoader.lookupDocumentation(amf, 0);
        });

        beforeEach(async () => {
          element = await basicFixture(amf, docs);
          anchors = element.shadowRoot.querySelectorAll('a');
        });

        it('cancels navigation to relative path', () => {
          const node = anchors[0];
          const spy = sinon.spy();
          element.addEventListener('click', spy);
          MockInteractions.tap(node);
          assert.isFalse(spy.called);
        });

        it('allows absolute paths', () => {
          const node = anchors[1];
          let called = false;
          element.addEventListener('click', (e) => {
            called = true;
            e.preventDefault();
          });
          MockInteractions.tap(node);
          assert.isTrue(called);
        });

        it('allows mailto: paths', () => {
          const node = anchors[2];
          let called = false;
          element.addEventListener('click', (e) => {
            called = true;
            e.preventDefault();
          });
          MockInteractions.tap(node);
          assert.isTrue(called);
        });

        it('ignores other clicks', () => {
          const spy = sinon.spy();
          element.addEventListener('click', spy);
          const node = element.shadowRoot.querySelector('.markdown-html');
          MockInteractions.tap(node);
          assert.isTrue(spy.called);
        });
      });
    });
  });
});
