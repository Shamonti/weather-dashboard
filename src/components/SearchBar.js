import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [cityName, setCityName] = useState('');

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      onSearch(cityName);
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Enter City Name'
        value={cityName}
        onChange={e => setCityName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
