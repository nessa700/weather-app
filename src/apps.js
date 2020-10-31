function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descrptiveElement = document.querySelector("#descrptive");
  let humidityElement = document.querySelector("#humidity");
  let WindElement = document.querySelector("#Wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  WindElement.innerHTML = Math.round(response.data.wind.speed);
  descrptiveElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "d29f07d8b5161b82f3e1b25f1f4fc000";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
