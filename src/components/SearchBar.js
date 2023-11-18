import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [cityName, setCityName] = useState('Dhaka');

  const handleSearch = () => {
    if (cityName.trim() !== '') {
      onSearch(cityName);
    }
  };

  //Search on hitting Enter
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='ms-2 w-3/5 md:w-3/4'>
      <input
        className='flex-initial w-full placeholder:italic placeholder:text-slate-400 p-2 ms-2 bg-slate-100 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
        type='text'
        placeholder='Enter City'
        value={cityName}
        onChange={e => setCityName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
