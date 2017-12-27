module.exports = function(apiDefinition, obj) {
  if (obj && obj.hasOwnProperty('$ref')) {
    let ref = obj.$ref.split('/');
    let refObj = {};

    for (let i in ref) {
      let propName = ref[i];
      if (propName === '#') {
        refObj = Object.assign({}, apiDefinition);
      } else {
        refObj = refObj[propName];
      }
    }

    // Merge objects
    obj = Object.assign(refObj, obj);
  }
  return obj;
};
