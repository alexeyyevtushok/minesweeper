const bombChecker = (array, i, j, columns, rows) => {
  let bombCounter = 0;
  if (j + 1 < rows && array[i][j + 1] === "bomb") bombCounter++;
  if (j - 1 >= 0 && array[i][j - 1] === "bomb") bombCounter++;
  if (i + 1 < columns && array[i + 1][j] === "bomb") bombCounter++;
  if (i - 1 >= 0 && array[i - 1][j] === "bomb") bombCounter++;
  if (i + 1 < columns && j - 1 >= 0 && array[i + 1][j - 1] === "bomb")
    bombCounter++;
  if (i + 1 < columns && j + 1 < rows && array[i + 1][j + 1] === "bomb")
    bombCounter++;
  if (i - 1 >= 0 && j + 1 < 8 && array[i - 1][j + 1] === "bomb") bombCounter++;
  if (i - 1 >= 0 && j - 1 >= 0 && array[i - 1][j - 1] === "bomb") bombCounter++;
  return bombCounter;
};

export default bombChecker;
