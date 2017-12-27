const boxLayout1 = require('../helpers/boxLayout1.js');
const boxLayout2 = require('../helpers/boxLayout2.js');
const jsonStringify = require('json-stable-stringify');
const schema = require('./schema.js');

module.exports = function(content, apiDefinition) {
  content.push({
    text: 'Definitions',
    style: 'h2',
    pageBreak: 'before'
  });

  for (let name in apiDefinition.definitions) {
      let definition = apiDefinition.definitions[name];
      // Title
      content.push({
        text: name,
        style: 'h3'
      });
      // Description
      content.push({
        text: definition.description,
        style: 'p'
      });

      // Schema
      let bodyDefinitionColumns = [];
      // Example
      if (definition.example) {
        bodyDefinitionColumns.push([{
          text: 'Example',
          style: 'h4'
        }, boxLayout1([{
          text: jsonStringify(definition.example, {
            space: 4
          }),
          style: 'code'
        }])]);
      }

      // Definition
      let bodyDefinition = [];
      schema(bodyDefinition, apiDefinition, definition);
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
