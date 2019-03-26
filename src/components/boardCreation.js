/* eslint-disable linebreak-style */
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function boardCreation(columns, rows, bombs) {
  const cellsInfo = [];
  for (let i = 0; i < columns; i += 1) {
    cellsInfo[i] = [];
    for (let j = 0; j < rows; j += 1) {
      cellsInfo[i][j] = [];
    }
  }
  for (let b = 0; b < bombs; b += 1) {
    // if i and j take the same value double times
    const randCol = randomInteger(0, columns - 1);
    const randRow = randomInteger(0, rows - 1);
    if (cellsInfo[randCol][randRow] === 'bomb') {
      b -= 1;
    }
    cellsInfo[randCol][randRow] = 'bomb';
  }
  return cellsInfo;
}

export default boardCreation;
