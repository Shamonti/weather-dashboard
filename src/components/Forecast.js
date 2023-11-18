import { useEffect, useState } from 'react';
import Chart from './Chart';

const KEY = '77d532a21cdfe00145926cf0513e15f5';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';

export default function Forecast({ cityName }) {
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
      <ul>
        {isLoading
          ? 'Loading'
          : forecastData.map(item => (
              <li key={item.date}>
                Date: {item.date}, Min Temp: {item.minTemp.toFixed(2)}°C, Max
                Temp: {item.maxTemp.toFixed(2)}°C
              </li>
            ))}
      </ul>
      {isLoading ? 'Loading' : <Chart forecastData={forecastData} />}
    </>
  );
}
