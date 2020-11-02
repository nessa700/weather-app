function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formartHours(timestamp)}`;
}
function formartHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descrptiveElement = document.querySelector("#descrptive");
  let humidityElement = document.querySelector("#humidity");
  let WindElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  WindElement.innerHTML = Math.round(response.data.wind.speed);
  descrptiveElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function displayforcast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;
  let timeElement = document.querySelector("#timeforcast");
  let time = null;
  timeElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `       </div>
                    <div class="col-sm-2">
                   <img src="http://openweathermap.org/img/wn/${
                     forecast.weather[0].icon
                   }@2x.png "/> 
     
           <strong> ${Math.round(
             forecast.main.temp_max
           )} </strong>° ${Math.round(forecast.main.temp_min)} °`;
    time = response.data.list[index];
    timeElement.innerHTML += `<div class="col-sm-2">           
                      ${formartHours(forecast.dt * 1000)}
                  </div>`;
  }
}

function search(city) {
  let apiKey = "d29f07d8b5161b82f3e1b25f1f4fc000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayforcast);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "d29f07d8b5161b82f3e1b25f1f4fc000";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiCall = `${apiUrl}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiCall).then(displayTemperature);
}
function getcurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getcurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentlocationbutton = document.querySelector("#location-button");
currentlocationbutton.addEventListener("click", getcurrentPosition);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

search("London");
