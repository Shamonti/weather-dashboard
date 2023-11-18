import { useEffect, useState } from 'react';

const KEY = '77d532a21cdfe00145926cf0513e15f5';
const lat = '23.811056';
const lon = '90.4152';

export default function CurrentWeather() {
  const [currweather, setCurrWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    async function fetchCurrentWeather() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
      );
      const data = await res.json();
      setCurrWeather(data);
      // console.log(data);
      setIsLoading(false);
    }
    fetchCurrentWeather();
  }, []);

  if (isLoading) return 'Loading';

  return (
    <div>
      <h2>Today's Overview</h2>
      <div className='bg-slate-500'>
        <p>
          CurrentWeather
          {currweather.weather && currweather.weather[0].description}
          {currweather.main && currweather.main.temp}
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
