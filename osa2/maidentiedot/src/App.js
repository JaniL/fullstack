import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Search = ({ filter, setFilter }) => {
  const handleOnChange = e => {
    setFilter(e.target.value)
  }
  return (
    <>
      find countries <input type='text' value={filter} onChange={handleOnChange} />
    </>
  )
}

const SingleCountryView = ({country}) => {
  const languageValues = Object.values(country.languages)
  const flagUrl = country.flags.svg || country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital}<br/>
        area {country.area}
      </p>
      <p>
        <b>languages:</b>
        <ul>
          {languageValues.map(languageValue => <li>{languageValue}</li>)}
        </ul>
      </p>
      <p>
        <img src={flagUrl} alt={`Flag of ${country.name.common}`} style={{width: '150px'}} />
      </p>
    </div>
  )
}

const CountryDataView = ({ filter, countryData }) => {
  const [selectedCountry, setSelectedCountry] = useState(undefined)
  const selectedCountryData = selectedCountry && countryData.find(({ name }) => name.common === selectedCountry)

  // for convenience, clear selectedCountry when the search filter is used
  useEffect(() => {
    setSelectedCountry(undefined)
  }, [filter])

  if (selectedCountryData) {
    return <SingleCountryView country={selectedCountryData} />
  }

  const countryNameIncludesFilterValue = filterValue => ( { name }) =>
    filterValue.length === 0 ||
    name.common.toLocaleLowerCase().includes(filterValue)
  const filteredCountries = countryData.filter(countryNameIncludesFilterValue(filter.toLocaleLowerCase()))

  if (filteredCountries.length > 10) {
    return <div>{'Too many matches, specfic another filter'}</div>
  }
  if (filteredCountries.length === 1) {
    const [countryData] = filteredCountries
    return <SingleCountryView country={countryData} />
  }

  const countryNames = filteredCountries.map(( { name }) => name.common)
  const sortedCountryNames = [...countryNames].sort()
  return (
    <div>
      {sortedCountryNames.map(countryName => (
        <>
        {countryName} <input type="button" value="show" onClick={() => setSelectedCountry(countryName)} />
        <br/>
        </>
      ))}
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countryData, setCountryData] = useState(undefined)

  useEffect(() => {
    if (countryData !== undefined) {
      return
    }
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountryData(res.data))

  }, [])

  if (countryData === undefined) {
    return null
  }

  return (
    <>
      <Search filter={filter} setFilter={setFilter} />
      <CountryDataView countryData={countryData} filter={filter} />
    </>
  );
}

export default App;
