import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '05af49b9a09fff75aebd4d84ed0c461f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('City field cannot be empty.');
      return;
    }

    try {
      setError('');
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError('Error fetching weather data. Please check the city name or try again later.');
    }
  };

  // Construct the icon URL based on the weather data
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img
            src={getWeatherIconUrl(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;