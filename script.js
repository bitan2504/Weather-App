const display = document.getElementById('display');
const wicon = document.getElementById('wicon');
const temp = document.getElementById('temparature');
const temp1 = document.getElementById('temparature1');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const crLocation = document.getElementById('location');
const weatherBox = document.getElementById('weather-box');
const initMessage = document.getElementById('init-message');
const suggestionsList = document.getElementById("suggestions");

const toggle_CtoF_btn = document.getElementById('toggle')
let centi = true;


function getWeather() {
    const API_key = 'ac031c67f89e43c190e8474cc99314ae';
    // const city_name = 'Jangipur';
    const city_name = document.getElementById('city-input').value;

    if (!city_name) {
        console.log('Please Enter Something');
        alert('Please Enter something!')
        return;
    }

    // Store the searched city in localStorage
    saveSearch(city_name);

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
const toggling_btn = (c,f)=>{
    console.log(c,f)
    toggle_CtoF_btn.addEventListener('click',()=>{
        centi = (centi)?false:true;
        (centi)?toggle_CtoF_btn.innerHTML="°F":toggle_CtoF_btn.innerHTML='°C';
        (centi)?temp.innerHTML = `${c}°C`:temp.innerHTML = `${f}°F`
    })
}
function displayWeather(data) {
    initMessage.style.display = "none"
    weatherBox.style.display = "block";
    temp.innerHTML = `${Math.round(data.main.temp - 273)}°C`;
    const centi = Math.round(data.main.temp - 273);
    const fer = Math.floor((centi * 9)/5 + 32)
    toggling_btn(centi,fer)
    pressure.innerHTML = data.main.pressure;
    humidity.innerHTML = data.main.humidity;
    crLocation.innerHTML = data.name;
    wind.innerHTML = data.wind.speed;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    wicon.src = iconUrl;
}

function saveSearch(city) {
    let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

    if (!searches.includes(city)) {
        searches.push(city);
        localStorage.setItem("weatherSearches", JSON.stringify(searches));
    }
}

// Function to show suggestions
function showSuggestions() {
    const input = document.getElementById("city-input").value.toLowerCase();
    let searches = JSON.parse(localStorage.getItem("weatherSearches")) || [];

    suggestionsList.innerHTML = "";

    if (input) {
        let filtered = searches.filter(city => city.toLowerCase().includes(input));

        if (filtered.length > 0) {
            suggestionsList.style.display = "block";
            filtered.map(city => {
                let li = document.createElement("li");
                li.textContent = city;
                li.onclick = () => {
                    document.getElementById("city-input").value = city;
                    suggestionsList.style.display = "none";
                };
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = "none";
        }
    } else {
        suggestionsList.style.display = "none";
    }
}

// Hide suggestions when clicking outside
document.addEventListener("click", function (event) {
    if (!event.target.matches("#city-input")) {
        suggestionsList.style.display = "none";
    }
});
