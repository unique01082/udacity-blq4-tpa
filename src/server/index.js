const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  getGeographyInfo,
  getOpenWeatherMapForecast,
  getPixabayResources,
  getWeatherBitForecast,
} = require("./services");
const { isToday } = require("./utils");

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
  console.log("req.body :>> ", req.body);
  const {
    data: {
      postalCodes: [{ lat, lng: long }],
    },
  } = await getGeographyInfo(req.body.place);

  const from = new Date(req.body.from);
  const to = new Date(req.body.to);

  let weatherData;

  try {
    if (isToday(from)) {
      weatherData = await (await getOpenWeatherMapForecast(lat, long)).data;
    } else {
      weatherData = await (await getWeatherBitForecast(lat, long)).data;
    }

    const placeData = await (await getPixabayResources(req.body.place)).data;

    const tripData = { weatherData, placeData, lat, long };
    projectData.push(tripData);
    res.send(tripData);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send({ error });
  }
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
