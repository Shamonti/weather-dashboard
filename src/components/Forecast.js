import { useEffect, useState } from 'react';
import Chart from './Chart';
import Box from './Box';
import Heading from './Heading';

const KEY = 'b8639626f07906764f0cc4875c2ac854';
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast';

export default function Forecast({ cityName, formatDate }) {
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecastData = async city => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseURL}?q=${city}&units=metric&appid=${KEY}`);
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

  //Display weather forecast details for Dhaka city on Mount
  useEffect(() => {
    fetchForecastData('Dhaka');
  }, []);

  //Display weather forecast details for the city name on query using Searchbar
  useEffect(() => {
    if (cityName.trim() !== '') {
      fetchForecastData(cityName);
    }
  }, [cityName]);

  //Grouping forecast Data for the same day
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

  if (isLoading) return 'Loading';
  // if (error) return <ErrorMessage message={error} />;

  //Only Display data when the API is not loading and there is no error
  if (!isLoading && !error)
    return (
      <>
        <Heading>Next 5 Days</Heading>
        <ul className='grid grid-cols-1 md:grid-cols-3 gap-2 mt-4'>
          {isLoading
            ? 'Loading'
            : forecastData.map(item => (
                <Box>
                  <li
                    key={item.date}
                    className='flex items-center justify-items-end'
                  >
                    <div className='w-1/2 text-start pe-2'>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className='flex flex-col border-l border-slate-500 ps-2 w-1/2 text-end'>
                      <span>Min: {item.minTemp.toFixed(2)}°C </span>
                      <span>Max: {item.maxTemp.toFixed(2)}°C</span>
                    </div>
                  </li>
                </Box>
              ))}
        </ul>

        <Chart forecastData={forecastData} />
      </>
    );
}
