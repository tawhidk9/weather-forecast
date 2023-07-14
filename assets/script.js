// DEPENDENCIES
var apiKey = "fa3cf77a02f9bb76410509c901c329c3"
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

// Get weather data 
function getWeather(city) {
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
}

//Fetch current weather

fetch(currentWeatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        displayCurrentWeather(data, city);
    });


//Fetch forecast

fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        displayForecast(data);
    });

// Display Current Weather 
function displayCurrentWeather(data, city) {
    currentWeatherEl.innerHTML = "";

    var cityNameEl = document.createElement("h2");
    cityNameEl.textContent = city + " (" + new Date().toLocaleDateString() + ")";
    
    var weatherIconEl = document.createElement("img");
    weatherIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    
    var temperatureEl = document.createElement("p");
    temperatureEl.textContent = "Temperature: " + data.main.temp + " °C";
    
    var humidityEl = document.createElement("p");
     humidityEl.textContent = "Humidity: " + data.main.humidity + "%";
    
     var windSpeedEl = document.createElement("p");
    windSpeedEl.textContent = "Wind Speed: " + data.wind.speed + " m/s";
}
