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
You can see compilation examples in the test folder.

## TODO
- [x] descriptions as markdown
- [x] link ref to models
- [ ] check if crash when there are missing elements
- [ ] custom properties 'x-'

### Properties to support
- [x] object.required
- [ ] object.maxProperties
- [ ] object.minProperties
- [ ] object.maxItems
- [ ] object.minItems
- [ ] object.uniqueItems
- [ ] object.additionalProperties

- [ ] .externalDocs
- [ ] .info.contact.url

- [x] .paths.{path}.{method}.consumes
- [x] .paths.{path}.{method}.produces
- [ ] .paths.{path}.[options, head, parameters]
- [ ] .paths.{path}.{method}.externalDocs
- [ ] .paths.{path}.{method}.schemes
- [ ] .paths.{path}.{method}.deprecated
- [ ] .paths.{path}.{method}.security
