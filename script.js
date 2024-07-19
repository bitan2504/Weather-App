const display = document.getElementById('display');
const wicon = document.getElementById('wicon');
const temp = document.getElementById('temp');
const wname = document.getElementById('wname');
const wdesc = document.getElementById('wdesc');
const cname = document.getElementById('cname');

function getWeather() {
    const API_key = 'ac031c67f89e43c190e8474cc99314ae';
    // const city_name = 'Jangipur';
    const city_name = document.getElementById('city').value;
    if (!city) {
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

    // fetch(FORECAST_url)
    //     .then(res => res.json())
    //     .then(data => {
    //         displayForecast(data);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         alert("Error fetching url!");
    //     });
}

function displayWeather(data) {
    temp.innerHTML = `${Math.round(data.main.temp-273)}`+`&#8451`;
    wname.innerHTML = data.weather[0].main;
    // wdesc.innerHTML = data.weather[0].description
    cname.innerHTML = data.name;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    wicon.src = iconUrl;
    // wicon.desc = data.weather[0].description;
    wicon.style.display = 'block';
}