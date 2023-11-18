import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [cityName, setCityName] = useState('');

  const handleSearch = city => {
    setCityName(city);
  };

  return (
    <div className='p-6'>
      <NavBar>
        <SearchBar onSearch={handleSearch} />
      </NavBar>

      <main>
        <CurrentWeather cityName={cityName} />

        <p>Forecast</p>
        <Forecast cityName={cityName} />
      </main>
    </div>
  );
}

export default App;
