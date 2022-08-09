import axios from "axios";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US");
};

const postListElement = document.querySelector(".trip-list");

export async function renderTripList() {
  postListElement.innerHTML = "Loading...";
  const trips = await (await axios.get("http://localhost:8080/trips")).data;
  const dom = trips
    .reverse()
    .map((trip) => {
      return renderTrip(trip);
    })
    .join("");

  postListElement.innerHTML = dom;
}

function renderTrip(trip) {
  return `<div class="trip-detail">
  <p class="trip-title">${trip.geographyInfo.postalCodes[0].placeName}</p>
  <p class="trip-date">${formatDate(trip.request.from)} - ${formatDate(
    trip.request.to
  )} (${trip.tripLength} days trip, start in next ${trip.tripStartIn} days)</p>
  <p class="trip-subtitle"><img src="${
    trip.countryData.flag
  }" alt="flag" width="30" height="20"  /> ${trip.countryData.name}</p>
  <p class="trip-date">Languages: ${trip.countryData.languages
    .map((language) => language.name)
    .join(", ")}</p>
  ${trip.countryData.currencies.map(
    (currency) =>
      `<p class="trip-currency">${currency.name} (${currency.code}) - ${
        currency.symbol
      } </p><p class="trip-exchange-rate">1$ = ${
        trip.currencyExchangeRateInfo.rates[currency.code] ?? "unknown"
      }${currency.symbol}</p>`
  )}
  <figure>
    <img
      class="trip-thumbnail"
      src="${trip.placeData.hits[0].largeImageURL}"
      alt=""
    />
    <figcaption class="trip-note">${trip.placeData.hits[0].tags}</figcaption>
  </figure>
  <section class="weather-list">
    ${trip.weatherData.data.map(renderWeather).join("")}
  </section>
</div>`;
}

function renderWeather(weather) {
  return `
  <div class="weather-detail">
    <p class="weather-date">${formatDate(weather.valid_date)}</p>
    <div class="weather-icon">
      <img src="/img/icons/${weather.weather.icon}.png" alt="" />
    </div>
    <p class="weather-desc">${weather.weather.description}</p>
    <p class="weather-temp">${weather.low_temp}°C / ${weather.high_temp}°C</p>
    <p class="weather-hum">${weather.rh}%</p>
  </div>`;
}
