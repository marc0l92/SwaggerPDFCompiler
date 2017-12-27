const request = require('./request.js');
const responses = require('./responses.js');

module.exports = function (content, apiDefinition) {
  content.push({
    text: 'Paths',
    style: 'h2',
    pageBreak: 'before'
  });

  for (let path in apiDefinition.paths) {
    for (let method in apiDefinition.paths[path]) {
      let api = apiDefinition.paths[path][method];
      // Title
      content.push({
        text: [{
          text: method.toUpperCase(),
          style: 'h3-' + method.toLowerCase()
        }, {
          text: ' ' + path,
          style: 'h3'
        }],
        style: 'h3'
      });
      // Description
      content.push({
        text: api.description,
        style: 'p'
      });
      // Request
      request(content, apiDefinition, api.parameters);
      // Reponse
      responses(content, apiDefinition, api.responses);
    }
  }
};