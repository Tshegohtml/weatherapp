import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Your OpenWeatherMap API key
const API_KEY = '05af49b9a09fff75aebd4d84ed0c461f';

// Base URL without API key
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
      // Make sure the API request is formatted correctly
      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      console.log(response);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      setError('Error fetching weather data. Please check the city name or try again later.');
    }
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
