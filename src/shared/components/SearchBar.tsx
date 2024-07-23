
// table search bar components search about field and country

import React, { useEffect, useMemo, useState } from 'react'
import { useDebounce } from '../hooks';
import Button from './Button';
import { fetchCountries } from '../services/apiService/apiUniversities';
import { Country } from '../interface/country';

interface SearchBarProps {
  onSearchBarChange: (search: string,country:string) => any;
  Reset: boolean,
  className?: string;

}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchBarChange, Reset, className }) => {
  const [search, setSearch] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const debouncedSearch = useDebounce(search, 500);
  const memoizedClassName = useMemo(() =>  ` search-container ${className}`, [className]);

  useEffect(() => {
    onSearchBarChange(search,selectedCountry)
    // eslint-disable-next-line
  }, [debouncedSearch,selectedCountry])

    // Fetch countries on component mount
    useEffect(() => {
      const getCountries = async () => {
        try {
          const data = await fetchCountries();
          setCountries(data);
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };
  
      getCountries();
    }, []);
    

  const handleSearchInputChange = (newValue: string) => {
    setSearch(newValue)
  }

  const ResetAction = () => {
    setSearch('')
    setSelectedCountry('')
  }
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };


  return (
    <div className={memoizedClassName}>
      <div className='form-group'>
        <label htmlFor="search"> Search</label>
          <input
            type="text"
            placeholder="Search by universities " value={search}
            onChange={(e) => handleSearchInputChange(e.target.value)}
          />
      </div>
      <div className='form-group'>
        <label htmlFor="Country"> Country</label>
        <select 
        id="country-select"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">Select Country</option>
        {countries.map(country => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      </div>
      {Reset && <Button className="btn btn-primary" icon="main-icon-refresh-ccw" onClick={ResetAction} />}
    </div>

  )
}

export default SearchBar

