module.exports = function (text) {
  var layout = {
    hLineWidth: function (rowIndex, node) {
      return 1;
    },
    vLineWidth: function (rowIndex, node) {
      return 1;
    },
    hLineColor: function (rowIndex, node) {
      return '#666';
    },
    vLineColor: function (rowIndex, node) {
      return '#666';
    },
    paddingLeft: function (rowIndex, node) {
      return 5;
    },
    paddingRight: function (rowIndex, node) {
      return 5;
    },
    paddingTop: function (rowIndex, node) {
      return 2;
    },
    paddingBottom: function (rowIndex, node) {
      return 5;
    },
    fillColor: function (rowIndex, node, colIndex) {
      return null;
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