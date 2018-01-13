const tableLayout = require('../helpers/tableLayout.js');
const reference = require('../helpers/reference.js');
const requestBody = require('./requestBody.js');
const dataTypeString = require('../helpers/dataTypeString.js');

module.exports = function (content, apiDefinition, parameters) {
  let body;
  let requestTable = [
    [{
      text: 'Name',
      style: 'tableHeader'
    }, {
      text: 'Description',
      style: 'tableHeader'
    }, {
      text: 'Type',
      style: 'tableHeader'
    }, {
      text: 'Data Type',
      style: 'tableHeader'
    }]
  ];

  for (let i in parameters) {
    let parameter = parameters[i];
    parameter = reference(apiDefinition, parameter);
    if (parameter.in !== 'body') {
      requestTable.push([parameter.name, parameter.description || '', parameter.in, dataTypeString(parameter)]);
    } else {
      body = parameter;
    }
  }

  // Request parameters
  if (requestTable.length > 1) {
    content.push({
      text: 'Request parameters',
      style: 'h4'
    });
    content.push({
      table: {
        widths: ["auto", "*", "auto", "*"],
        headerRows: 1,
        keepWithHeaderRows: 1,
        body: requestTable
      },
      style: 'table',
      layout: tableLayout
    });
  }

  // Request body
  requestBody(content, apiDefinition, body);
};