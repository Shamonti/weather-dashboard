import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

function App() {
  const [cityName, setCityName] = useState('');

  const handleSearch = city => {
    setCityName(city);
  };

  return (
    <div className='App'>
      <header>
        <h1 className='text-3xl font-bold underline'>Weather Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main>
        <CurrentWeather cityName={cityName} />

        <p>Forecast</p>
        <Forecast cityName={cityName} />
      </main>
    </div>
  );
}

export default App;
