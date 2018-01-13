const MarkdownIt = require('markdown-it');
const markdownIt = new MarkdownIt();
const openRegExp = new RegExp("^(.+)_open$");

function markdownToPdfmake(content, tokens) {
  while (tokens.length > 0) {
    let token = tokens.shift();

    if (token.type.endsWith('_open')) {
      let tag = token.type.match(openRegExp)[1];
      let line = [];
      markdownToPdfmake(line, tokens);
      let element = {
        text: (line.length === 1 && typeof line[0] === 'string') ? line[0] : line,
        style: tag,
      };
      if (tag === "link") {
        element.link = token.attrs[0][1];
      }
      content.push(element);
    } else if (token.type.endsWith('_close')) {
      return;
    } else {
      switch (token.type) {
        case 'inline':
          let line = [];
          markdownToPdfmake(line, token.children);
          content.push({
            text: line,
            style: 'p'
          });
          break;
        case 'text':
          content.push(token.content);
          break;
        default:
          if (token.content) {
            content.push({
              text: token.content,
              style: token.type
            });
          }
          break;
      }
    }
  }
}

module.exports = function (content, markdownString) {
  // Remove duplicated spaces
  markdownString = markdownString.replace(/\s+/g, ' ');
  // Split the string on <br> tags
  let lines = markdownString.split('<br>');
  for (let i in lines) {
    let tokens = markdownIt.parseInline(lines[i], {});
    markdownToPdfmake(content, tokens);
  }
};