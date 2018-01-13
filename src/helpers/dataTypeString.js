module.exports = function (element) {
  let typeString = "";
  // Data type
  if (element.type === 'array') {
    typeString += (element.items.type) ? element.items.type : '';
    typeString += '[]';
  } else {
    typeString += element.type;
  }
  // Extra
  if (element.hasOwnProperty('required') && element.required) {
    typeString += ' [Required]';
  }
  if (element.hasOwnProperty('default')) {
    typeString += ' (default:"' + element.default+'")';
  }
  if (element.hasOwnProperty('enum')) {
    typeString += ', enum(' + element.enum.map(val => '"' + val + '"').join(', ') + ')';
  }
  if (element.hasOwnProperty('pattern')) {
    typeString += ' (pattern: /' + element.pattern + '/)';
  }
  if (element.hasOwnProperty('format')) {
    typeString += ' (' + element.format + ')';
  }

  // Value bound
  let valueBoud = false;
  let minValue = '-' + String.fromCharCode(0x221e) + ' <';
  let maxValue = '< +' + String.fromCharCode(0x221e);
  if (element.hasOwnProperty('maximum')) {
    maxValue = String.fromCharCode(0x2264) + ' ' + element.maximum;
    valueBoud = true;
  }
  if (element.hasOwnProperty('exclusiveMaximum')) {
    maxValue = '< ' + element.exclusiveMaximum;
    valueBoud = true;
  }
  if (element.hasOwnProperty('minimum')) {
    minValue = element.minimum + ' ' + String.fromCharCode(0x2264);
    valueBoud = true;
  }
  if (element.hasOwnProperty('exclusiveMinimum')) {
    minValue = element.exclusiveMinimum + ' <';
    valueBoud = true;
  }
  if (valueBoud) {
    typeString += ' (' + minValue + ' x ' + maxValue + ')';
  }

  // Length bound
  let lengthBoud = false;
  let minLength = "Up";
  let maxLength = String.fromCharCode(0x221e);
  if (element.hasOwnProperty('maxLength')) {
    maxLength = element.maxLength;
    lengthBoud = true;
  }
  if (element.hasOwnProperty('minLength')) {
    minLength = element.minLength;
    lengthBoud = true;
  }
  if (lengthBoud) {
    typeString += ' (' + minLength + ' to ' + maxLength + ' chars)';
  }

  return typeString;
};