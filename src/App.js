import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { useState } from 'react';
import Heading from './components/Heading';

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

      <Main>
        <Heading>Today's Overview</Heading>
        <CurrentWeather cityName={cityName} />

        <p>Forecast</p>
        <Forecast cityName={cityName} />
      </Main>
    </div>
  );
}

export default App;
