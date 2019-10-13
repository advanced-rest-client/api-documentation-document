import { AmfHelperMixin } from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import { LitElement } from 'lit-element';

export const AmfLoader = {};

class HelperElement extends AmfHelperMixin(LitElement) {}
window.customElements.define('helper-element', HelperElement);

const helper = new HelperElement();

AmfLoader.load = async function(compact) {
  const file = '/demo-api' + (compact ? '-compact' : '') + '.json';
  const url = location.protocol + '//' + location.host + '/base/demo/'+ file;
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
      const data = JSON.parse(e.target.response);
      resolve(data);
    });
    xhr.open('GET', url);
    xhr.send();
  });
};

AmfLoader.lookupDocumentation = function(model, index) {
  helper.amf = model;
  const encodes = helper._computeEncodes(model);
  const key = helper._getAmfKey(helper.ns.aml.vocabularies.core.documentation);
  let docs = encodes[key];
  if (!(docs instanceof Array)) {
    docs = [docs];
  }
  return docs[index];
};
