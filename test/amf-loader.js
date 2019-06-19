export const AmfLoader = {};
AmfLoader.load = async function(index, compact) {
  const file = '/demo-api' + (compact ? '-compact' : '') + '.json';
  const url = location.protocol + '//' + location.host + '/demo/'+ file;
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
      let data = JSON.parse(e.target.response);
      const original = data;
      /* istanbul ignore else */
      if (data instanceof Array) {
        data = data[0];
      }
      const encKey = compact ? 'doc:encodes' : 'http://a.ml/vocabularies/document#encodes';
      let encodes = data[encKey];
      /* istanbul ignore else */
      if (encodes instanceof Array) {
        encodes = encodes[0];
      }
      const endKey = compact ? 'schema-org:documentation' : 'http://schema.org/documentation';
      let docs = encodes[endKey];
      /* istanbul ignore if */
      if (!(docs instanceof Array)) {
        docs = [docs];
      }
      resolve([original, docs[index]]);
    });
    xhr.open('GET', url);
    xhr.send();
  });
};
