module.exports = function(text) {
  var layout = {
    hLineWidth: function(rowIndex, node) {
      return 1;
    },
    vLineWidth: function(rowIndex, node) {
      return 1;
    },
    hLineColor: function(rowIndex, node) {
      return '#ccc';
    },
    vLineColor: function(rowIndex, node) {
      return '#ccc';
    },
    paddingLeft: function(rowIndex, node) {
      return 4;
    },
    paddingRight: function(rowIndex, node) {
      return 4;
    },
    paddingTop: function(rowIndex, node) {
      return 2;
    },
    paddingBottom: function(rowIndex, node) {
      return 2;
    },
    fillColor: function(rowIndex, node, colIndex) {
      return '#eee';
    }
  };

  return {
    table: {
      widths: ["*"],
      body: [text]
      //dontBreakRows: true
    },
    margin: [0, 0, 10, 0],
    layout: layout
  };
};
