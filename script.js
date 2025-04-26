function searchCountry() {
    const countryName = document.getElementById('countrySearch').value;
    if (!countryName) return;

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(countryData => {
            const capital = countryData[0].capital ? countryData[0].capital[0] : null;
            if (!capital) {
                alert('No valid capital found for this country.');
                return;
            }
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=GithuberErrorerJonneKeytaAddKoriNai&units=metric`) //Github er Error er Jonne Key ta Add Kori Nai
                .then(response => response.json())
                .then(weatherData => {
                    if (weatherData.cod === 404) {
                        alert('Weather data not found for this capital.');
                        return;
                    }
                    displayCountryData(countryData[0], weatherData);
                })
                .catch(error => alert('Error fetching weather data.'));
        })
        .catch(error => alert('Error fetching country data.'));
}

function displayCountryData(country, weather) {
    const countriesGrid = document.getElementById('countriesGrid');

    const flagUrl = country.flags.png; 
    const countryCard = document.createElement('div');
    countryCard.classList.add('country-card');

    countryCard.innerHTML = `
        <img src="${flagUrl}" alt="Flag">
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <button onclick="showMoreDetails('${country.name.common}', '${weather.main.temp}', '${weather.weather[0].description}', '${flagUrl}', '${country.population}')">More Details</button>
    `;

    countriesGrid.appendChild(countryCard);
}

function showMoreDetails(name, temp, description, flag, population) {
    alert(`More details about ${name}:\nWeather: ${description}\nTemperature: ${temp}°C\nPopulation: ${population}`);
}
