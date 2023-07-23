// DEPENDENCIES
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

// Initial call to update the date and time
updateTime();
// Update the date and time every second
setInterval(updateTime, 1000);

// Retrieve the previous searches from local storage
var previousSearches = localStorage.getItem('WeatherSearches');
var searchList = previousSearches ? JSON.parse(previousSearches) : [];

// Display the last 5 searches
displaySearchHistory();

// Add event listener to the fetch button
fetchWeatherButton.addEventListener('click', function(event) {
    event.preventDefault();
    var cityInput = searchInput.value.trim();
    cityInput = capitalizeFirstLetter(cityInput); // Capitalize the first letter of the city name even if user types in lowercase
    console.log(cityInput);
    if (cityInput) {
        displayWeatherData(cityInput);
        addSearchToHistory(cityInput);
        searchInput.value = '';
    }
});


console.log(cityInput);

// Function to display weather data
function displayWeatherData(city) {
    var APIKey = "ba70abfea88f3c5981bd2ee116de0d18";
    var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`;

    fetch(geocodeUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(function(data) {
            var latitude = data[0].lat;
            var longitude = data[0].lon;
            var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

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

    currentWeatherEl.appendChild(cityNameEl);
    currentWeatherEl.appendChild(weatherIconEl);
    currentWeatherEl.appendChild(temperatureEl);
    currentWeatherEl.appendChild(humidityEl);
    currentWeatherEl.appendChild(windSpeedEl);
}
