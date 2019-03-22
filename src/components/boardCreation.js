function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function boardCreation(columns, rows, bombs) {
  const cellsInfo = [];
  for (let i = 0; i < columns; i++) {
    cellsInfo[i] = [];
    for (let j = 0; j < rows; j++) {
      cellsInfo[i][j] = [];
    }
  }
  for (let b = 0; b < bombs; b++) {
    //if i and j take the same value double times
    const randCol = randomInteger(0, columns - 1);
    const randRow = randomInteger(0, rows - 1);
    if (cellsInfo[randCol][randRow] === 'bomb') {
      b--;
    }
    cellsInfo[randCol][randRow] = 'bomb';
  }
  console.log(cellsInfo)
  return cellsInfo;
}

export default boardCreation;