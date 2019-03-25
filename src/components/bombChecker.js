const bombChecker = (array, i, j, columns, rows) => {
  let bombCounter = 0;
  if (i + 1 < columns && i - 1 >= 0 && j + 1 < rows && j - 1 >= 0) {
    if (array[i][j + 1] === "bomb") bombCounter++;
    if (array[i][j - 1] === "bomb") bombCounter++;
    if (array[i + 1][j] === "bomb") bombCounter++;
    if (array[i - 1][j] === "bomb") bombCounter++;
    if (array[i + 1][j - 1] === "bomb") bombCounter++;
    if (array[i + 1][j + 1] === "bomb") bombCounter++;
    if (array[i - 1][j + 1] === "bomb") bombCounter++;
    if (array[i - 1][j - 1] === "bomb") bombCounter++;
  }
  return bombCounter;
};

export default bombChecker;
