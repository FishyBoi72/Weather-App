document.getElementById('zipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zipCode').value;
    const apiKey = 'e71e04d4e636ef92b7a43fb0f32549c5';
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`;
    const zipApiUrl = `http://api.zippopotam.us/us/${zipCode}`;

    // Fetch weather data
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => {
            if (weatherData.cod === '404') {
                alert('City not found. Please enter a valid zip code.');
                return;
            }
            // Fetch zip code data
            fetch(zipApiUrl)
                .then(response => response.json())
                .then(zipData => {
                    const currentDate = new Date().toLocaleDateString();
                    const city = weatherData.name;
                    const state = zipData.places[0]['state abbreviation'];
                    const currentTemp = weatherData.main.temp;
                    const currentConditions = weatherData.weather[0].description;
                    const tempHiLo = `${weatherData.main.temp_max} / ${weatherData.main.temp_min}`;

                    document.getElementById('currentDate').innerText = currentDate;
                    document.getElementById('city').innerText = city;
                    document.getElementById('state').innerText = state;
                    document.getElementById('currentTemp').innerText = currentTemp;
                    document.getElementById('currentConditions').innerText = currentConditions;
                    document.getElementById('tempHiLo').innerText = tempHiLo;

                    document.getElementById('weatherData').classList.remove('hidden');
                })
                .catch(error => {
                    console.error('Error fetching zip code data:', error);
                    alert('Error fetching location data. Please try again later.');
                });
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
});
