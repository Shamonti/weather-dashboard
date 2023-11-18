import { useEffect, useState } from 'react';
import Chart from './Chart';
import Box from './Box';

const KEY = '77d532a21cdfe00145926cf0513e15f5';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';

export default function Forecast({ cityName, formatDate }) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${baseURL}?q=${cityName}&units=metric&appid=${KEY}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch forecast data');
        }
        const data = await res.json();
        setForecast(data.list.slice(8, 40));
        setError(null);
      } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        setError('Error fetching forecast data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecast();
  }, [cityName]);

  const forecastData = forecast.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    const existingDay = acc.find(day => day.date === date);

    if (existingDay) {
      existingDay.temps.push(item.main.temp);
      existingDay.minTemp = Math.min(existingDay.minTemp, item.main.temp_min);
      existingDay.maxTemp = Math.max(existingDay.maxTemp, item.main.temp_max);
    } else {
      acc.push({
        date: date,
        temps: [item.main.temp],
        minTemp: item.main.temp_min,
        maxTemp: item.main.temp_max,
      });
    }
    return acc;
  }, []);

  return (
    <>
      {error && <p>Error: {error}</p>}
      <ul className='grid grid-cols-3 gap-2 mt-4'>
        {isLoading
          ? 'Loading'
          : forecastData.map(item => (
              <Box>
                <li key={item.date} className='flex'>
                  <span>{formatDate(item.date)}</span>
                  <div className='flex flex-col justify-between  border-l border-slate-500 ps-3'>
                    <span>{item.minTemp.toFixed(2)}°C </span>
                    <span>{item.maxTemp.toFixed(2)}°C</span>
                  </div>
                </li>
              </Box>
            ))}
      </ul>

      {isLoading ? 'Loading' : <Chart forecastData={forecastData} />}
    </>
  );
}
