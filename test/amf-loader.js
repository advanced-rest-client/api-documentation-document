const AmfLoader = {};
AmfLoader.load = function(index, compact) {
  index = index || 0;
  const file = '/demo-api' + (compact ? '-compact' : '') + '.json';
  const url = location.protocol + '//' + location.host +
    location.pathname.substr(0, location.pathname.lastIndexOf('/'))
    .replace('/test', '/demo') + file;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (e) => {
      let data;
      try {
        data = JSON.parse(e.target.response);
      } catch (e) {
        reject(e);
        return;
      }
      const original = data;
      if (data instanceof Array) {
        data = data[0];
      }
      const encKey = compact ? 'doc:encodes' : 'http://a.ml/vocabularies/document#encodes';
      let encodes = data[encKey];
      if (encodes instanceof Array) {
        encodes = encodes[0];
      }
      const endKey = compact ? 'schema-org:documentation' : 'http://schema.org/documentation';
      let docs = encodes[endKey];
      if (!(docs instanceof Array)) {
        docs = [docs];
      }
      resolve([original, docs[index]]);
    });
    xhr.addEventListener('error',
      () => reject(new Error('Unable to load model file')));
    xhr.open('GET', url);
    xhr.send();
  });
};
