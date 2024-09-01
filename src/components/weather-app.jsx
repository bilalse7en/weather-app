import React, { useState } from "react";
import axios from "axios";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherCards, setWeatherCards] = useState([]);

  const fetchWeatherData = async (cityName) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=41ef67271034acb86df54777bb871271`
      );
      console.log(data);
      const newCard = {
        city: cityName,
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
      
      setWeatherCards((prevCards) => [...prevCards, newCard]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleAddCity = () => {
    if (
      city &&
      !weatherCards.some((card) => card.city.toLowerCase() === city.toLowerCase())
    ) {
      fetchWeatherData(city);
      setCity("");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-white mb-8">Weather App</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-700 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white w-full max-w-xs"
        />
        <button
          onClick={handleAddCity}
          className="ml-3 px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Add City
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {weatherCards.map(({ city, temp, humidity, description, icon }, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-xl p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 ${
              index % 2 === 0 ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2 capitalize">{city}</h2>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
              className="w-20 h-20 mb-4"
            />
            <p className="text-lg">Temperature: {(temp - 273.15).toFixed(2)}°C</p> 
            <p className="text-lg">Humidity: {humidity}%</p>
            <p className="text-lg capitalize">Condition: {description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
