// Define the conversion function
function convertCelsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

async function searchWeather() {
    const apiKey = 'f359723d06118c5ac63aefd0d5de7835';
    const city = document.getElementById('search').value;

    // Construct the URL for the OpenWeatherMap API requests
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('API URL:', url);
        console.log('API Response:', data);

        if (data.cod === '404') {
            document.getElementById('city-name').innerText = 'City not found';
            resetWeatherInfo();
           
        } else {

            //Convert temperature from Celsius to Fahrenheit
            const temperatureInCelsius = data.main.temp;
            const temperatureInFahrenheit = convertCelsiusToFahrenheit(temperatureInCelsius);

            console.log(temperatureInFahrenheit); //This will log the converted temperature in Fahrenheit

            const feelsLikeInCelsius = data.main.feels_like;
            const feelsLikeInFahrenheit = convertCelsiusToFahrenheit(feelsLikeInCelsius);

            document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `${temperatureInFahrenheit.toFixed(2)}°F`;
            document.getElementById('wind-speed').innerText = `${data.wind.speed} mph`;
            document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            document.getElementById('uv-index').innerText = data.value ? data.value : '--';
            document.getElementById('feels-like').innerText = `${feelsLikeInFahrenheit.toFixed(2)}°F`;

            //Clothing suggestion based on temperature
            const temperature = data.main.temp;
            document.getElementById('clothing-suggestion').innerText = suggestClothing(temperature);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('city-name').innerText = 'An error occurred while fetching data';
        resetWeatherInfo();
    }
    function resetWeatherInfo() {
        document.getElementById('temperature').innerText = '--';
        document.getElementById('wind-speed').innerText = '--m/s';
        document.getElementById('humidity').innerText = '--%';
        document.getElementById('uv-index').innerText = '--';
        document.getElementById('feels-like').innerText = '--°F'
        document.getElementById('clothing-suggestion').innerText = 'Clothing-Suggestion: --';

    }

    function suggestClothing(temperature) {
        if(temperature > 30) {
            return 'Wear light and breathable clothes.';
        }   else if (temperature > 20){
            return 'A t-shirt and shorts would be comfortable.';
        } else if (temperature > 10) {
            return 'Consider wearing a light jacker or sweater.';
        } else {
            return 'It might be chilly today. Wear a warm jacket and layers.';
        }
    }
    
}

// Event listener for the search-button
document.getElementById('search-button').addEventListener('click', searchWeather);
// Event listener for the search-button
           