import cellOpener from "../components/cellOpener";

function handleClick(i, j, x, y, column, row) {
  const array = [
    [2, "bomb", 3, 1, 0, 0, 0, 0],
    [2, "bomb", "bomb", 1, 0, 0, 0, 0],
    [1, 2, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, "bomb", 1, 0, 0, 0, 0],
    [0, 1, "bomb", 1, 0, 0, 0, 0]
  ];
  array[i][j] += 10;
  cellOpener(i, j, column, row, array, handleClick);
  return array[x][y];
}

test("algo stop", () => {
  const value = handleClick(0, 0, 1, 0, 8, 8);
  expect(value).toBe(2);
});

// test("algo open cells", () => {
//   const value = handleClick(3, 0, 2, 0, 8, 8);
//   expect(value).toBe(1);
// });
