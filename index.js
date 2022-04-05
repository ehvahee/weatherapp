function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let replaceCity = document.querySelector("#replace-city");
  replaceCity.innerHTML = `${searchInput.value}`;
  let city = `${searchInput.value}`;

  let apiKey = "309df4d5a54300eab011fb0dc95d4919";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  function displayWeatherInfo(response) {
    let cityElement = document.querySelector("#replace-city");

    cityElement.innerHTML = response.data.name;

    let temperatureElement = document.querySelector("#temp");
    let temperature = Math.round(response.data.main.temp);
    temperatureElement.innerHTML = `${temperature}°`;

    let humidityElement = document.querySelector("#humidity");
    let humidity = Math.round(response.data.main.humidity);
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = Math.round(response.data.wind.speed);
    windSpeedElement.innerHTML = `Wind speed: ${windSpeed} mph`;

    let countryElement = document.querySelector("#country-code");
    let country = response.data.sys.country;
    countryElement.innerHTML = `, ${country}`;
    console.log(response.data);

    let weatherDescriptionElement = document.querySelector(
      "#weather-description"
    );
    let weatherDescription = response.data.weather[0].description;
    weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  }

  axios.get(apiUrl).then(displayWeatherInfo);
}

let form = document.querySelector("#general-form");
form.addEventListener("submit", search);

// Current Date and Time
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}
let now = new Date();
let dateAndTime = document.querySelector("#date-and-time");
dateAndTime.innerHTML = formatDate(now);

// Current Location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "309df4d5a54300eab011fb0dc95d4919";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current");
locationButton.addEventListener("click", getCurrentLocation);

// Weather at Current Location

function showCurrentTemperature(response) {
  let tempRounded = Math.round(response.data.main.temp);
  let place = response.data.name;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);

  let replaceCity = document.querySelector("#replace-city");
  replaceCity.innerHTML = `${place}`;

  let replaceTemp = document.querySelector("#temp");
  replaceTemp.innerHTML = `${tempRounded}°C`;

  let replaceHumidity = document.querySelector("#humidity");
  replaceHumidity.innerHTML = `Humidity: ${humidity}%`;

  let replaceWindSpeed = document.querySelector("#wind-speed");
  replaceWindSpeed.innerHTML = `Wind speed: ${windSpeed} mph`;
}

