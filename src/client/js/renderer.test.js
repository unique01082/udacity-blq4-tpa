import { renderTripList } from "./renderer";

test("not a string to be false", () => {
  expect(typeof renderTripList).toBe("function");
});
