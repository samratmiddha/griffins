export default function handleCsv(data, instances) {
  var allRows = data.split(/\r?\n|\r/);
  if (!instances) {
    instances = allRows.length();
  }
  var stockData = [];
  for (var singleRow = 1; singleRow <= instances; singleRow++) {
    var rowCells = allRows[singleRow].split(",");
    if (singleRow > 1) {
      var prevRowCells = allRows[singleRow - 1].split(",");
      if (rowCells[3] < prevRowCells[3]) {
        stockData.push({
          time: rowCells[0],
          high: rowCells[2],
          low: rowCells[3],
          trend: "D",
        });
      } else {
        stockData.push({
          time: rowCells[0],
          high: rowCells[2],
          low: rowCells[3],
          trend: "I",
        });
      }
    } else {
      stockData.push({
        time: rowCells[0],
        high: rowCells[2],
        low: rowCells[3],
        trend: "I",
      });
    }
  }
  return stockData;
}
