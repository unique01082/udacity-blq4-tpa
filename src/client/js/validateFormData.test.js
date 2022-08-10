import { validateFormData } from "./validateFormData";

test("not a string to be false", () => {
  expect(typeof validateFormData).toBe("function");
});
