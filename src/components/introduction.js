module.exports = function(content, apiDefinition) {
  if (apiDefinition.hasOwnProperty('info')) {
    // Title
    content.push({
      text: apiDefinition.info.title || 'Api documentaiton',
      style: 'h1'
    });

    // Host Baseurl and Version
    content.push({
      text: [{
        text: 'Host: ',
        style: 'strong'
      }, apiDefinition.host, {
        text: ', Base URL: ',
        style: 'strong'
      }, apiDefinition.basePath, {
        text: ', Version: ',
        style: 'strong'
      }, apiDefinition.info.version]
    });

    // Contact
    if (apiDefinition.info.hasOwnProperty('contact') && (apiDefinition.info.contact.name || apiDefinition.info.contact.email)) {
      let author = {
        text: [{
          text: 'Author: ',
          style: 'strong'
        }]
      };
      if (apiDefinition.info.contact.name && apiDefinition.info.contact.email) {
        author.text.push({
          text: apiDefinition.info.contact.name,
          link: 'mailto:' + apiDefinition.info.contact.email,
          style: 'a'
        });
      } else {
        author.text.push({
          text: apiDefinition.info.contact.name || apiDefinition.info.contact.email
        });
      }
      content.push(author);
    }

    content.push({
      text: '',
      style: 'br'
    });
    content.push({
      text: apiDefinition.info.description,
      style: 'p'
    });
  } else {
    content.push({
      text: 'Api documentaiton',
      style: 'h1'
    });
  }

  // Default types
  if (apiDefinition.hasOwnProperty('schemes')) {
    content.push({
      text: [{
        text: 'Schemes: ',
        style: 'strong'
      }, apiDefinition.schemes.join(', ')]
    });
  }
  if (apiDefinition.hasOwnProperty('consumes')) {
    content.push({
      text: [{
        text: 'Default request content-types: ',
        style: 'strong'
      }, apiDefinition.consumes.join(', ')]
    });
  }
  if (apiDefinition.hasOwnProperty('produces')) {
    content.push({
      text: [{
        text: 'Default response content-types: ',
        style: 'strong'
      }, apiDefinition.produces.join(', ')]
    });
  }
};
