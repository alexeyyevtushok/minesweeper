function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function boardCreation(columns,rows,bombs){
  const cellsInfo =[];
  for (let i = 0; i <columns; i++) {
    cellsInfo[i] = [];
    for (let j = 0; j < rows; j++) {
      cellsInfo[i][j] = [];
    }
  }
  for(let b =0;b<bombs;b++){
    cellsInfo[randomInteger(0,columns-1)][randomInteger(0,rows-1)]='bomb';
  }
  console.log(cellsInfo)
  return  cellsInfo;
}


export default boardCreation;