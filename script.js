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
const loader = document.getElementById('apiLoader')
const toggle_CtoF_btn = document.getElementById('toggle')
const cityInput=document.getElementById('city-input');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
let centi = true;

function getWeather() {
    const API_key = 'ac031c67f89e43c190e8474cc99314ae';
    const city_name = document.getElementById('city-input').value.trim();

    if (!city_name) {
        showErrorModal('Please enter a city name!');
        return;
    }

    // Store the searched city in localStorage
    saveSearch(city_name);

    const WEATHER_url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city_name)}&appid=${API_key}`;

    loader.style.display = 'block';

    fetchWeatherData(WEATHER_url);
}

function fetchWeatherData(url) {
    setTimeout(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                displayWeather(data);
                loader.style.display = 'none';
            })
            .catch(err => {
                loader.style.display = 'none';
                showErrorModal(`Failed to fetch weather data. Please check your connection or try again later.`);
            });
    }, 500);
}
// Function to show error modal
function showErrorModal(message) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();

    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <p id="modalMessage">${message}</p>
            <button id="closeModal" class="close">Close</button>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modal);

    // Display the modal
    setTimeout(() => modal.style.display = "block", 100);

    // Close the modal on button click
    document.getElementById("closeModal").onclick = () => hideModal(modal);

    // Close the modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) hideModal(modal);
    };
}

// Helper function to hide and remove modal
function hideModal(modal) {
    modal.style.animation = "fadeOut 0.3s ease-in-out";
    setTimeout(() => modal.remove(), 300);
}


const toggling_btn = (c, f) => {
    toggle_CtoF_btn.addEventListener('click', () => {
        centi = (centi) ? false : true;
        (centi) ? toggle_CtoF_btn.innerHTML = "°F" : toggle_CtoF_btn.innerHTML = '°C';
        (centi) ? temp.innerHTML = `${c}°C` : temp.innerHTML = `${f}°F`
    })
}
function displayWeather(data) {
    initMessage.style.display = "none"
    weatherBox.style.display = "block";
    temp.innerHTML = `${Math.round(data.main.temp - 273)}°C`;
    const centi = Math.round(data.main.temp - 273);
    const fer = Math.floor((centi * 9) / 5 + 32)
    toggling_btn(centi, fer)
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
                    getWeather();
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
document.addEventListener('click', function (event) {
    if (!event.target.matches("#city-input")) {
        suggestionsList.remove();
    }
});

document.addEventListener('keypress', function (event) {
    if (!event.target.matches("#city-input")) {
        suggestionsList.remove();
    }
});

//When user press "Enter"
cityInput.addEventListener('keypress',function(event){
    if(event.key==='Enter'){
        event.preventDefault();
        suggestionsList.remove();
        getWeather();
    }
});

// When bg image fails to load
document.addEventListener("DOMContentLoaded", function () {
    const targetClasses = [".form", ".w-details-head"];

    targetClasses.forEach(className => {
        const elements = document.querySelectorAll(className);

        elements.forEach(element => {
            let bgImage = getComputedStyle(element).backgroundImage;

            if (!bgImage || bgImage === "none" || bgImage === 'url("about:blank")') {
                let parent = element.parentElement;
                while (parent) {
                    bgImage = getComputedStyle(parent).backgroundImage;
                    if (bgImage && bgImage !== "none" && bgImage !== 'url("about:blank")') {
                        break;
                    }
                    parent = parent.parentElement;
                }
            }

            if (!bgImage || bgImage === "none" || bgImage === 'url("about:blank")') {
                element.style.color = "black";
            } else {
                element.style.color = "white";
            }
        });
    });
});