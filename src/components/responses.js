const responseCodeText = require('../helpers/responseCode.json');
const boxLayout1 = require('../helpers/boxLayout1.js');
const boxLayout2 = require('../helpers/boxLayout2.js');
const jsonStringify = require('json-stable-stringify');
const tableLayout = require('../helpers/tableLayout.js');
const dataTypeString = require('../helpers/dataTypeString.js');
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

    // Schema
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

    // Headers
    if (response.hasOwnProperty('headers')) {
      let headersTable = [
        [{
          text: 'Header',
          style: 'tableHeader'
        }, {
          text: 'Description',
          style: 'tableHeader'
        }, {
          text: 'Data Type',
          style: 'tableHeader'
        }]
      ];

      for (let headerName in response.headers) {
        let header = response.headers[headerName];
        headersTable.push([headerName, header.description || '', dataTypeString(header)]);
      }

      if (headersTable.length > 1) {
        content.push({
          table: {
            widths: ["auto", "*", "auto"],
            headerRows: 1,
            keepWithHeaderRows: 1,
            body: headersTable
          },
          style: 'table',
          layout: tableLayout
        });
        content.push({
          text: '',
          style: 'br'
        });
      }
    }
  }
};