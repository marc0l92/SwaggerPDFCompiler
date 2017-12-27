module.exports = function (text, margin) {
  var layout = {
    hLineWidth: function (rowIndex, node) {
      return 0;
    },
    vLineWidth: function (rowIndex, node) {
      return (rowIndex === 0) ? 2 : 0;
    },
    hLineColor: function (rowIndex, node) {
      return null;
    },
    vLineColor: function (rowIndex, node) {
      return '#aaa';
    },
    paddingLeft: function (rowIndex, node) {
      return 4;
    },
    paddingRight: function (rowIndex, node) {
      return 4;
    },
    paddingTop: function (rowIndex, node) {
      return 2;
    },
    paddingBottom: function (rowIndex, node) {
      return 2;
    },
    fillColor: function (rowIndex, node, colIndex) {
      return null;
    }
  };

  // Margin default value
  if (!margin) margin = 0;

  return {
    table: {
      widths: ["*"],
      body: [text]
      //dontBreakRows: true
    },
    margin: [margin, 0, 10, 0],
    layout: layout
  };
};