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
      // Tags
      let tags = [{
        text: 'Tags: ',
        style: 'strong'
      }];
      for (let index in api.tags) {
        tags.push({
          text: api.tags[index],
          style: 'span'
        });
      }
      content.push({
        text: tags,
        style: 'p'
      });
      // Description
      if (api.description) {
        // Descrition to markdown
        markdown(content, api.description);
      } else if (api.summary) {
        content.push({
          text: api.summary,
          style: 'p'
        });
      }

      // Request
      request(content, apiDefinition, api);

      // Reponse
      responses(content, apiDefinition, api);
    }
  }
};