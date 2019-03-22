function detectionCreation(columns,rows,bombs){
  const cellsInfo =[];
  for (let i = 0; i <columns; i++) {
    cellsInfo[i] = [];
    for (let j = 0; j < rows; j++) {
      cellsInfo[i][j] = [];
    }
  }
  return  cellsInfo;
}


export default detectionCreation;