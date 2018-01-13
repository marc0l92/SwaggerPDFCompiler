const responseCodeText = require('../helpers/responseCode.json');
const boxLayout1 = require('../helpers/boxLayout1.js');
const boxLayout2 = require('../helpers/boxLayout2.js');
const jsonStringify = require('json-stable-stringify');
const schema = require('./schema.js');

module.exports = function (content, apiDefinition, api) {
  content.push({
    text: 'Response',
    style: 'h4'
  });

  // Response content type
  if (api.hasOwnProperty('produces')) {
    content.push({
      text: [{
        text: 'Response content-types: ',
        style: 'strong'
      }, {
        text: api.produces.join(', '),
        style: 'span'
      }],
      style: 'p'
    });
  }

  for (let responseCode in api.responses) {
    let response = api.responses[responseCode];
    content.push({
      text: responseCode + ' ' + responseCodeText[responseCode],
      style: 'strong'
    });
    content.push({
      text: response.description,
      style: 'p'
    });

    if (response.hasOwnProperty('schema')) {
      if (response.schema.hasOwnProperty('$ref')) {
        content.push({
          text: 'See section: ' + response.schema.$ref,
          style: 'p'
        });
      } else {
        let bodyDefinitionColumns = [];

        // Example
        if (response.hasOwnProperty('examples')) {
          for (let responseType in response.examples) {
            let example = response.examples[responseType];
            bodyDefinitionColumns.push([{
              text: 'Example for ' + responseType,
              style: 'h4'
            }, boxLayout1([{
              text: jsonStringify(example, {
                space: 4
              }),
              style: 'code'
            }])]);
          }
        } else if (response.schema.hasOwnProperty('example')) {
          let example = response.schema.example;
          bodyDefinitionColumns.push([{
            text: 'Example',
            style: 'h4'
          }, boxLayout1([{
            text: jsonStringify(example, {
              space: 4
            }),
            style: 'code'
          }])]);
        }

        // Definition
        let bodyDefinition = [];
        schema(bodyDefinition, apiDefinition, response.schema);
        bodyDefinitionColumns.push([{
          text: 'Definition',
          style: 'h4'
        }, boxLayout2([{
          stack: bodyDefinition
        }])]);

        // Create columns
        content.push({
          columns: bodyDefinitionColumns,
          margin: [5, 0, 5, 10]
        });
      }
    }
  }
};