const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  getGeographyInfo,
  getPixabayResources,
  getWeatherBitForecast,
  getCountryInfo,
  getCurrencyExchangeRate,
} = require("./services");
const { dateDiff } = require("../utils");

const projectData = [];

const app = express();

app.use(express.static(path.resolve("dist")));
app.use(cors());
app.use(bodyParser.json());

// Get all trips
app.get("/trips", async (req, res) => {
  res.send(projectData);
});

// Create new trip
app.post("/trips", async (req, res) => {
  const from = new Date(req.body.from);
  const to = new Date(req.body.to);
  let geographyInfo;
  try {
    geographyInfo = await (await getGeographyInfo(req.body.place)).data;
  } catch (error) {
    res.statusCode(400).send({ error });
    return;
  }

  if (!geographyInfo.postalCodes.length) {
    res.statusCode(400).send({ error });
    return;
  }

  const {
    postalCodes: [{ lat, lng: long, countryCode }],
  } = geographyInfo;

  try {
    let weatherData = await (await getWeatherBitForecast(lat, long)).data;

    const placeData = await (await getPixabayResources(req.body.place)).data;

    const countryData = await (await getCountryInfo(countryCode)).data;
    const currencyExchangeRateInfo = await (
      await getCurrencyExchangeRate(
        ...countryData.currencies.map((currency) => currency.code)
      )
    ).data;

    const tripData = {
      request: req.body,
      geographyInfo,
      weatherData,
      placeData,
      countryData,
      currencyExchangeRateInfo,
      lat,
      long,
      tripLength: dateDiff(from, to),
      tripStartIn: dateDiff(from),
    };
    projectData.push(tripData);
    res.send(tripData);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// designates what port the app will listen to for incoming requests
app.listen(9099, function () {
  console.log("Example app listening on port 9099!");
});
