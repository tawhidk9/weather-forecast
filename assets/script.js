// DEPENDENCIES
var apiKey = "YOUR_API_KEY";
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");

// Form Submission
searchFormEl.addEventListener("submit", function (event) {
  event.preventDefault();
  var city = searchInputEl.value.trim();
  if (city) {
    getWeather(city);
    searchInputEl.value = "";
  }
});

// Search History
searchHistoryEl.addEventListener("click", function (event) {
  var city = event.target.getAttribute("data-city");
  if (city) {
    getWeather(city);
  }
});