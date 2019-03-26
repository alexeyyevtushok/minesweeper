const cellOpener = (i, j, column, rows, array, handleFunc) => {
  if (array[i][j] > 10) {
    return;
  }
  // down
  if (i + 1 < column && array[i + 1][j] < 10) {
    handleFunc(i + 1, j);
  }
  // top
  if (i - 1 >= 0 && array[i - 1][j] < 10) {
    handleFunc(i - 1, j);
  }
  // left
  if (j - 1 >= 0 && array[i][j - 1] < 10) {
    handleFunc(i, j - 1);
  }
  // right
  if (j + 1 < rows && array[i][j + 1] < 10) {
    handleFunc(i, j + 1);
  }
  // up-right
  if (j + 1 < rows && i - 1 >= 0 && array[i - 1][j + 1] < 10) {
    handleFunc(i - 1, j + 1);
  }
  // up-left
  if (j - 1 >= 0 && i - 1 >= 0 && array[i - 1][j - 1] < 10) {
    handleFunc(i - 1, j - 1);
  }
  // down-right
  if (j + 1 < rows && i + 1 < column && array[i + 1][j + 1] < 10) {
    handleFunc(i + 1, j + 1);
  }
  // down-left
  if (j - 1 >= 0 && i + 1 < column && array[i + 1][j - 1] < 10) {
    handleFunc(i + 1, j - 1);
  }
};

export default cellOpener;
