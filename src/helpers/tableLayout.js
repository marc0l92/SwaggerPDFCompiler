module.exports = {
  hLineWidth: function(rowIndex, node) {
    return 0;
  },
  vLineWidth: function(rowIndex, node) {
    return 1;
  },
  hLineColor: function(rowIndex, node) {
    return null;
  },
  vLineColor: function(rowIndex, node) {
    return 'white';
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
    return (rowIndex === 0) ? '#00b050' : '#f2f2f2';
  }
};
