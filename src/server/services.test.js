const {
  getCountryInfo,
  getCurrencyExchangeRate,
  getGeographyInfo,
  getPixabayResources,
  getWeatherBitForecast,
} = require("./services");

test("not a string to be false", () => {
  expect(typeof getCountryInfo).toBe("function");
  expect(typeof getCurrencyExchangeRate).toBe("function");
  expect(typeof getGeographyInfo).toBe("function");
  expect(typeof getPixabayResources).toBe("function");
  expect(typeof getWeatherBitForecast).toBe("function");
});
