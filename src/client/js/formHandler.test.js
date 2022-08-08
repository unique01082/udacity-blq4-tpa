const { handleSubmit } = require("./formHandler");

test("not a string to be false", () => {
  expect(typeof handleSubmit).toBe("function");
});
