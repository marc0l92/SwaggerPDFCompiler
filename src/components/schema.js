const reference = require('../helpers/reference.js');
const boxProperties = require('../helpers/boxProperties.js');
const dataTypeString = require('../helpers/dataTypeString.js');
const INDENTATION = 6;

function parseSchema(content, apiDefinition, schema, margin) {
  schema = reference(apiDefinition, schema);
  switch (schema.type) {
    case 'object':
      content.push({
        text: 'Properties',
        fontFeatures: ["smcp"],
        margin: [margin, 3, 0, 2]
      });

      let objectProperties = [];
      for (let name in schema.properties) {
        let property = schema.properties[name];

        // Expand array items with reference
        if (property.type === 'array') {
          property.items = reference(apiDefinition, property.items);
        }

        objectProperties.push({
          text: [{
            text: name + ': ',
            style: 'strong'
          }, {
            text: dataTypeString(property),
            style: 'dataType',
            italics: true
          }],
          margin: [0, 0, 0, 0]
        });
        parseSchema(objectProperties, apiDefinition, property, INDENTATION);
      }
      content.push(boxProperties([{
        stack: objectProperties
      }], margin));
      break;
    case 'array':
      content.push({
        text: [{
          text: 'Items: ',
          fontFeatures: ["smcp"]
        }, {
          text: dataTypeString(schema),
          style: 'dataType',
          italics: true
        }],
        margin: [margin, 3, 0, 0]
      });
      parseSchema(content, apiDefinition, schema.items, margin + INDENTATION);
      break;
    default:
      // Try to guess the type
      if (schema.hasOwnProperty('properties')) {
        schema.type = 'object';
        parseSchema(content, apiDefinition, schema, margin);
      } else if (schema.description) {
        content.push({
          text: schema.description,
          style: "p",
          margin: [margin, 0, 0, 0]
        });
      }
      break;
  }
}

module.exports = function (content, apiDefinition, schema) {
  parseSchema(content, apiDefinition, schema, 0);
  //content.push(JSON.stringify(schema));
};