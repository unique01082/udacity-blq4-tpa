const { checkForUrl } = require("./urlChecker");

test("not a string to be false", () => {
  expect(checkForUrl(null)).toBe(false);
  expect(checkForUrl(undefined)).toBe(false);
  expect(checkForUrl(NaN)).toBe(false);
  expect(checkForUrl(1)).toBe(false);
  expect(checkForUrl(true)).toBe(false);
});
