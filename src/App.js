import Forecast from './components/Forecast';
import CurrentWeather from './components/CurrentWeather';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { useState } from 'react';
import Heading from './components/Heading';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [cityName, setCityName] = useState('');

  const handleSearch = city => {
    setCityName(city);
  };

  const formatDate = inputDate => {
    const date = new Date(inputDate);

    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date);

    return formattedDate;
  };

  return (
    <div className='p-6'>
      <NavBar>
        <SearchBar onSearch={handleSearch} />
      </NavBar>

      <Main>
        <CurrentWeather cityName={cityName} formatDate={formatDate} />
        <Forecast cityName={cityName} formatDate={formatDate} />
      </Main>
    </div>
  );
}

export default App;
