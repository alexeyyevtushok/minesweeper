import bombChecker from "../components/bombChecker";
const array = [
  [null, "bomb", null, null],
  [null, "bomb", "bomb", null],
  [null, null, null, null],
  [null, null, "bomb", null]
];
test("edge value", () => {
  const value = bombChecker(array, 0, 0, 4, 4);
  expect(value).toBe(2);
});
test("3 bombs", () => {
  const value = bombChecker(array, 0, 2, 4, 4);
  expect(value).toBe(3);
});
test("no bombs", () => {
  const value = bombChecker(array, 3, 0, 4, 4);
  expect(value).toBe(0);
});
