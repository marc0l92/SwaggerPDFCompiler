const tableLayout = require('../helpers/tableLayout.js');

module.exports = function(content, apiDefinition) {
  if (apiDefinition.hasOwnProperty('tags') && Array.isArray(apiDefinition.tags)) {
    content.push({
      text: 'Summary',
      style: 'h2'
    });

    // Format paths in order to keep only the needed information
    let pathsSummary = {};
    for (let path in apiDefinition.paths) {
      for (let method in apiDefinition.paths[path]) {
        for (let i in apiDefinition.paths[path][method].tags) {
          let tag = apiDefinition.paths[path][method].tags[i];
          if (!pathsSummary.hasOwnProperty(tag)) {
            pathsSummary[tag] = [
              [{
                text: 'Operation',
                style: 'tableHeader'
              }, {
                text: 'Description',
                style: 'tableHeader'
              }]
            ];
          }
          pathsSummary[tag].push([
            method.toUpperCase() + ' ' + path,
            apiDefinition.paths[path][method].summary
          ]);
        }
      }
    }

    for (let index in apiDefinition.tags) {
      let tag = apiDefinition.tags[index];
      // Section Header
      content.push({
        text: tag.name,
        style: 'h3'
      });
      content.push({
        text: tag.description,
        style: 'p'
      });
      // Section API
      if (pathsSummary.hasOwnProperty(tag.name)) {
        content.push({
          table: {
            "widths": ["*", "*"],
            headerRows: 1,
            keepWithHeaderRows: 1,
            body: pathsSummary[tag.name]
          },
          style: 'table',
          layout: tableLayout
        });
      }

    }
  }
};
