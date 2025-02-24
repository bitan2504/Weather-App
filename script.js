const display = document.getElementById('display');
const wicon = document.getElementById('wicon');
const temp = document.getElementById('temparature');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const crLocation = document.getElementById('location');
const weatherBox = document.getElementById('weather-box');
const initMessage = document.getElementById('init-message');
    const wicon = document.getElementById('wicon');
    const temp = document.getElementById('temp');
    const tempo = document.getElementsByClassName('temporary')[0];
    const wname = document.getElementById('wname');
    const wdesc = document.getElementById('wdesc');
    const cname = document.getElementById('cname');
    const suggestionsList = document.getElementById("suggestions");

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
    function getWeather() {
        const API_key = 'ac031c67f89e43c190e8474cc99314ae';
        const city_name = document.getElementById('city').value.trim();

        if (!city_name) {
            alert('Please enter a city name!');
            return;
        }

        // Store the searched city in localStorage
        saveSearch(city_name);

        const WEATHER_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`;

        fetch(WEATHER_url)
            .then(res => res.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(err => {
                console.error(err);
                alert("Error fetching weather data!");
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
    function displayWeather(data) {
        display.style.display = 'grid';
        temp.innerHTML = `${Math.round(data.main.temp - 273)}&#8451;`;
        wname.innerHTML = data.weather[0].main;
        tempo.style.display = 'none';
        cname.innerHTML = data.name;

        const iconCode = data.weather[0].icon;
        wicon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        wicon.style.display = 'block';
    }

    // Function to save search queries in localStorage
    function saveSearch(city) {
        let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

        if (!searches.includes(city)) {
            searches.push(city);
            localStorage.setItem("weatherSearches", JSON.stringify(searches));
        }
    }

    // Function to show suggestions
    function showSuggestions() {
        const input = document.getElementById("city").value.toLowerCase();
        let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

        suggestionsList.innerHTML = "";
        suggestionsList.style.display = "none";

        if (input) {
            let filtered = searches.filter(city => city.toLowerCase().includes(input));
            if (filtered.length > 0) {
                suggestionsList.style.display = "block";
                filtered.forEach(city => {
                    let li = document.createElement("li");
                    li.textContent = city;
                    li.onclick = () => {
                        document.getElementById("city").value = city;
                        suggestionsList.style.display = "none";
                    };
                    suggestionsList.appendChild(li);
                });
            }
        }
    }

    // Hide suggestions when clicking outside
    document.addEventListener("click", function(event) {
        if (!event.target.matches("#city")) {
            suggestionsList.style.display = "none";
        }
    });

    