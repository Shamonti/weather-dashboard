import { useEffect, useState } from 'react';
// import { useFetch } from './hooks/useFetch';
import Chart from './components/Chart';
import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';

const KEY = 'c7019640d36dbf4ba293776fa5bcfa89';
const lat = '23.811056';
const lon = '90.4152';

function App() {
  const [currweather, setCurrWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoading2, setIsLoading2] = useState(false);

  useEffect(function () {
    setIsLoading(true);
    async function fetchCurrentWeather() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`
      );
      const data = await res.json();
      setCurrWeather(data.main);
      setIsLoading(false);
    }
    fetchCurrentWeather();
  }, []);

  useEffect(function () {
    setIsLoading(true);
    async function fetchForecast() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}`
      );
      const data = await res.json();
      setForecast(data.list.slice(0, 5));
      setIsLoading(false);
    }
    fetchForecast();
  }, []);

  return (
    <div className='App'>
      <h1 className='text-3xl font-bold underline'>Weather Dashboard</h1>

      <p>
        {isLoading ? 'Loading' : <CurrentWeather currweather={currweather} />}
      </p>

      <p>Forecast</p>
      {isLoading ? 'Loading' : <Forecast forecast={forecast} />}

      <useFetch />
      <Chart />
    </div>
  );
}

export default App;
