/* eslint-disable no-undef */
import cellOpener from '../components/cellOpener';

let array = [[1, 'bomb', 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

function clicker(i, j) {
  if (array[i][j] < 10) {
    const updatedArray = array.slice();
    updatedArray[i][j] += 10;
    array = updatedArray;
    cellOpener(i, j, 4, 4, array, clicker);
  }
}

test('click,open,stop', () => {
  clicker(0, 0);
  expect(array[0][0]).toBe(11);
});

test('click and stop', () => {
  clicker(0, 0);
  expect(array[1][0]).toBe(1);
});

test('bomb click', () => {
  clicker(0, 1);
  expect(array[1][0]).toBe(1);
});

test('if epmty -> cell open', () => {
  clicker(3, 3);
  expect(array[2][2]).toBe(10);
});
