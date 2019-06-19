import { fixture, assert, nextFrame } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../api-documentation-document.js';

describe('<api-documentation-document>', function() {
  async function basicFixture() {
    return (await fixture(`<api-documentation-document></api-documentation-document>`));
  }

  [
    ['Full AMF model', false],
    ['Compact AMF model', true]
  ].forEach((item) => {
    describe(item[0], () => {
      let element;
      let amf;
      let docs;

      before(async () => {
        const data = await AmfLoader.load(1, item[1]);
        amf = data[0];
        docs = data[1];
      });

      beforeEach(async () => {
        element = await basicFixture();
        element.amf = amf;
        element.shape = docs;
        await nextFrame();
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

      it('Does not call _shapeChanged() when setting the same sape value', () => {
        const spy = sinon.spy(element, '_shapeChanged');
        element.shape = docs;
        assert.isFalse(spy.called);
      });
    });
  });
});
