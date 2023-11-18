import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

const KEY = '77d532a21cdfe00145926cf0513e15f5';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

export default function CurrentWeather({ cityName }) {
  const [currweather, setCurrWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherByCity = async cityName => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseURL}?q=${cityName}&appid=${KEY}`);
      const data = await res.json();
      setCurrWeather(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherByCity(cityName);
  }, [cityName]);

  if (isLoading) return 'Loading';

  return (
    <div>
      <h2>Today's Overview</h2>
      <div className='bg-slate-500'>
        <p>
          CurrentWeather
          {currweather.weather && currweather.weather[0].description}
          {currweather.main && currweather.main.temp - 273.15}
        </p>
      </div>
      <div className='bg-yellow-500'>
        <div className='bg-red-500'>
          Pressure
          {currweather.main && currweather.main.pressure}
        </div>
        <div className='bg-orange-500'>
          Humidity
          {currweather.main && currweather.main.humidity}
        </div>
        <div className='bg-purple-500'>
          Wind Speed
          {currweather.wind && currweather.wind.speed}
        </div>
      </div>
    </div>
  );
}
