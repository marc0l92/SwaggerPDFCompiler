const request = require('./request.js');
const responses = require('./responses.js');
const markdown = require('../helpers/markdown.js');

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
        id: api.operationId,
        style: 'h3'
      });
      // Description
      if (api.description) {
        // Descrition to markdown
        let line = [];
        markdown(line, api.description);
        content.push({
          text: line,
          style: 'p'
        });
      } else if (api.summary) {
        content.push({
          text: api.summary,
          style: 'p'
        });
      }
      // Request
      request(content, apiDefinition, api.parameters);
      // Reponse
      responses(content, apiDefinition, api.responses);
    }
  }
};