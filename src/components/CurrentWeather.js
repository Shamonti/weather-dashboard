import { useEffect, useState } from 'react';
import { IoLocationOutline, IoSpeedometerOutline } from 'react-icons/io5';
import { CiCalendarDate } from 'react-icons/ci';
import { FaWind } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';

import Box from './Box';

const KEY = '77d532a21cdfe00145926cf0513e15f5';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

export default function CurrentWeather({ cityName, formatDate }) {
  const [currweather, setCurrWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherByCity = async cityName => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${baseURL}?q=${cityName}&units=metric&appid=${KEY}`
      );
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
    <div className='flex flex-row mt-3'>
      <div className='flex flex-col flex-initial w-1/2 '>
        <Box>
          <div className='pb-3'>
            <img
              className='py-2'
              src={`http://openweathermap.org/img/w/${
                currweather.weather && currweather.weather[0].icon
              }.png`}
              alt={currweather.weather && currweather.weather[0].description}
            />
            <p className='font-medium text-2xl'>
              {currweather.main && currweather.main.temp}°C
            </p>
            <p className='text-sm capitalize py-1'>
              {currweather.weather && currweather.weather[0].description}
            </p>
          </div>
          <div className='border-t border-slate-600 my-3 pt-6 px-1'>
            <div className='flex items-center'>
              <IoLocationOutline size={22} />
              <span className='ps-1'>{currweather.name}</span>
            </div>
            <div className='flex items-center pt-2'>
              <CiCalendarDate size={22} />
              <span className='ps-1'>{formatDate(Date())}</span>
            </div>
          </div>
        </Box>
      </div>
      <div className='flex flex-col justify-items-center flex-initial w-1/2 ms-3'>
        <Box>
          <div className='flex items-center'>
            <FaWind size={22} />
            <div className='ms-6'>
              <span className='text-sm text-slate-500'>Wind Speed</span>
              <p className='font-medium text-lg'>
                {currweather.wind && currweather.wind.speed} km/h
              </p>
            </div>
          </div>
        </Box>
        <Box>
          <div className='flex items-center'>
            <IoSpeedometerOutline size={22} />
            <div className='ms-6'>
              <span className='text-sm text-slate-500'>Pressure</span>
              <p className='font-medium text-lg'>
                {currweather.main && currweather.main.pressure} hPa
              </p>
            </div>
          </div>
        </Box>
        <Box>
          <div className='flex items-center'>
            <WiHumidity size={32} />
            <div className='ms-6'>
              <span className='text-sm text-slate-500'>Humidity</span>
              <p className='font-medium text-lg'>
                {currweather.main && currweather.main.humidity} %
              </p>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
