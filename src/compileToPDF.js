const fs = require('fs');
const PdfPrinter = require('pdfmake');
const YAML = require('yamljs');
const style = require('./style.json');

// Check arguments
if (process.argv.length < 3) {
  console.log("Usage:", process.argv[0], process.argv[1], "<OpenAPIDocument.yaml>");
  process.exit();
}

// Load documentation
var apiDefinition = YAML.load(process.argv[2]);
if (!apiDefinition.hasOwnProperty('swagger') || apiDefinition.swagger !== '2.0') {
  console.log("Currently only Swagger 2.0 is supported");
  process.exit();
}

// Define font to use
var fontDescriptors = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
  },
  Helvetica: {
    normal: 'fonts/Helvetica/HLR.ttf',
    bold: 'fonts/Helvetica/HLR.ttf',
    italics: 'fonts/Helvetica/HLI.ttf',
    bolditalics: 'fonts/Helvetica/HelveticaMedCdObl.ttf'
  },
  Fat: {
    normal: 'fonts/Special/olivers-barney.ttf',
  }
};

// Define document content
var info = {
  "title": apiDefinition.info.title,
  //"author": apiDefinition.info.contact.name,
  "subject": "Swagger API definition"
};
var header = {
  margin: [40, 20, 40, 20],
  columns: [{
    text: '',
    color: '#bbb'
  }, {
    image: 'images/logo.jpg',
    width: 15
  }]
};
var footer = function (currentPage, pageCount) {
  return {
    text: currentPage.toString() + '/' + pageCount,
    alignment: 'right',
    margin: [0, 0, 30, 0]
  };
};
var content = [];

// Introduciton
require('./components/introduction.js')(content, apiDefinition);
require('./components/tags.js')(content, apiDefinition);
require('./components/paths.js')(content, apiDefinition);
require('./components/definitions.js')(content, apiDefinition);

// Finalize PDF file
var printer = new PdfPrinter(fontDescriptors);
var docDefinition = {
  "info": info,
  //  "header": header,
  "footer": footer,
  "content": content,
  "styles": style,
  "defaultStyle": style.default
};
var pdfKitDoc = printer.createPdfKitDocument(docDefinition);
pdfKitDoc.pipe(fs.createWriteStream(process.argv[2] + '.pdf'));
pdfKitDoc.end();