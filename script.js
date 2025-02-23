const display = document.getElementById('display');
const wicon = document.getElementById('wicon');
const temp = document.getElementById('temparature');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const crLocation = document.getElementById('location');
const weatherBox = document.getElementById('weather-box');
const initMessage = document.getElementById('init-message');

function getWeather() {
    const API_key = 'ac031c67f89e43c190e8474cc99314ae';
    // const city_name = 'Jangipur';
    const city_name = document.getElementById('city-input').value;

    if (!city_name) {
        console.log('Please Enter Something');
        alert('Please Enter something!')
        return;
    }
    const WEATHER_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;
    // const FORECAST_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}`;

    fetch(WEATHER_url)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(err => {
            console.error(err);
            alert("Error fetching url!");
        });
}

function displayWeather(data) {
    initMessage.style.display = "none"
    weatherBox.style.display = "block";
    temp.innerHTML = `${Math.round(data.main.temp - 273)}`;
    pressure.innerHTML = data.main.pressure;
    humidity.innerHTML = data.main.humidity;
    crLocation.innerHTML = data.name;
    wind.innerHTML = data.wind.speed;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    wicon.src = iconUrl;
}