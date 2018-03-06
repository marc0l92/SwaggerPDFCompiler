# SwaggerPDFCompiler
Convert your OpenAPI2.0/Swagger2.0 definitions to PDF documents.

## Usage
```
# Download the tool 
npm install swagger-pdf-compiler

# Install the dependencies
npm install

# Compile your document
node .\src\compileToPDF.js yourSwaggerFile.yaml
```

## Examples
You can see some compilation examples in the test folder.

## TODO
- [x] descriptions as markdown
- [x] link ref to models
- [ ] check if there are crash when there are missing elements in the definition
- [ ] allow custom properties 'x-'

### Properties to support
- [ ] .externalDocs
- [ ] .info.contact.url

- [ ] .paths.{path}.[options, head, parameters]
- [ ] .paths.{path}.{method}.externalDocs
- [ ] .paths.{path}.{method}.schemes
- [ ] .paths.{path}.{method}.deprecated
- [ ] .paths.{path}.{method}.security

- [ ] object.maxProperties
- [ ] object.minProperties
- [ ] object.maxItems
- [ ] object.minItems
- [ ] object.uniqueItems
- [ ] object.additionalProperties