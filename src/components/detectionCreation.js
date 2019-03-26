function detectionCreation(columns, rows) {
  const cellsInfo = [];
  for (let i = 0; i < columns; i += 1) {
    cellsInfo[i] = [];
    for (let j = 0; j < rows; j += 1) {
      cellsInfo[i][j] = [];
    }
  }
  return cellsInfo;
}


export default detectionCreation;
