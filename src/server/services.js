const axios = require("axios");

async function getGeographyInfo(place) {
  return axios.get("http://api.geonames.org/postalCodeSearchJSON", {
    params: {
      placename: place,
      maxRows: 10,
      username: "baolq",
    },
  });
}

async function getOpenWeatherMapForecast(lat, long) {
  return axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat: lat,
      lon: long,
      appid: "923fe800aca046b69819c7c974ad2e28",
    },
  });
}

async function getWeatherBitForecast(lat, long) {
  return axios.get("https://api.weatherbit.io/v2.0/forecast/daily", {
    params: {
      lat: lat,
      lon: long,
      key: "6cd6797f3a504083972bae578ac74d6a",
    },
  });
}

async function getPixabayResources(place) {
  return axios.get("https://pixabay.com/api/", {
    params: {
      q: place,
      image_type: "photo",
      key: "29109324-27047344207076bed08151480",
    },
  });
}

module.exports = {
  getGeographyInfo,
  getOpenWeatherMapForecast,
  getPixabayResources,
  getWeatherBitForecast,
};
