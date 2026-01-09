const weatherCard = document.getElementById("weatherCard");
const API_KEY = "4354340dce41b8d36d2f376618eedbfa"; // Replace with your API key

function getWeatherEmoji(weather) {
    const main = weather.toLowerCase();
    if (main.includes("clear")) return "☀️";
    if (main.includes("cloud")) return "☁️";
    if (main.includes("rain")) return "🌧️";
    if (main.includes("snow")) return "❄️";
    if (main.includes("storm")) return "⛈️";
    if (main.includes("mist") || main.includes("fog")) return "🌫️";
    return "🌡️";
}

function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const emoji = getWeatherEmoji(data.weather[0].description);
            weatherCard.innerHTML = `
                <div class="emoji">${emoji}</div>
                <p><strong>${data.name}</strong></p>
                <p>${data.main.temp}°C</p>
                <p>${data.weather[0].description}</p>
                <p>💨 Wind: ${data.wind.speed} m/s</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(() => {
            weatherCard.innerHTML = `<p>⚠️ Unable to fetch weather data.</p>`;
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            () => {
                weatherCard.innerHTML = `<p>⚠️ Location access denied.</p>`;
            }
        );
    } else {
        weatherCard.innerHTML = `<p>⚠️ Geolocation not supported.</p>`;
    }
}

getLocation();
