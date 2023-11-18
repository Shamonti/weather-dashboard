import { useEffect, useState } from 'react';
import Chart from './Chart';

const KEY = '77d532a21cdfe00145926cf0513e15f5';
const lat = '23.811056';
const lon = '90.4152';

export default function Forecast() {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    async function fetchForecast() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
      );
      const data = await res.json();
      setForecast(data.list.slice(8, 40));
      setIsLoading(false);
    }
    // console.log(forecast);
    fetchForecast();
  }, []);

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

  console.log();

  return (
    <>
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
