const boxLayout1 = require('../helpers/boxLayout1.js');
const boxLayout2 = require('../helpers/boxLayout2.js');
const jsonStringify = require('json-stable-stringify');
const schema = require('./schema.js');

module.exports = function (content, apiDefinition, api, body) {
  // Request body
  if (body) {
    content.push({
      text: 'Request body',
      style: 'h4'
    });
    content.push({
      text: body.description,
      style: 'p'
    });

    // Consumes content type
    if (api.hasOwnProperty('consumes')) {
      content.push({
        text: [{
          text: 'Request content-types: ',
          style: 'strong'
        }, {
          text: api.consumes.join(', '),
          style: 'span'
        }],
        style: 'p'
      });
    }

    let bodyDefinitionColumns = [];

    // Example
    if (body.schema.example) {
      bodyDefinitionColumns.push([{
        text: 'Example',
        style: 'h4'
      }, boxLayout1([{
        text: jsonStringify(body.schema.example, {
          space: 4
        }),
        style: 'code'
      }])]);
    }

    // Definition
    let bodyDefinition = [];
    schema(bodyDefinition, apiDefinition, body.schema);
    bodyDefinitionColumns.push([{
      text: 'Definition',
      style: 'h4'
    }, boxLayout2([{
      stack: bodyDefinition
    }])]);

    // Create columns
    content.push({
      columns: bodyDefinitionColumns,
      margin: [10, 0, 10, 0]
    });
  }
};