async function searchWeather() {
    const apiKey = ''
    const city = document.getElementById(' search ').ariaValueMax;

    const response = await fetch('httpa://api.openweathermap.org/data/2.5/weather?q=$')
   const data = await response.json();

if (data.cod === '404') {
    document.getElementById('weather-info').innerHTML = 'City not found';
} else {
    const weatherInfo = '
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p> 
    <p>Weather:</p>'
}

}
}