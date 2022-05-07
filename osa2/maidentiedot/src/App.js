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

const CityWeather = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(undefined)
  const { REACT_APP_API_KEY } = process.env

  useEffect(() => {
    if (!REACT_APP_API_KEY || weatherData !== undefined) {
      return
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: cityName,
        appid: REACT_APP_API_KEY,
        units: 'metric'
      }
    })
      .then(res => setWeatherData(res.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityName])

  if (!REACT_APP_API_KEY) {
    return 'openweathermap api key not set'
  }

  if (!weatherData) {
    return null
  }

  return (
    <div>
      <h2>Weather in {cityName}</h2>
      <p>
        temperature {weatherData.main.temp} Celcius
      </p>
      <p>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather.main} />
      </p>
      <p>
        wind {weatherData.wind.speed} m/s
      </p>
    </div>
  )
}

const SingleCountryView = ({country}) => {
  const languageValues = Object.values(country.languages)
  const flagUrl = country.flags.svg || country.flags.png
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital}<br/>
        area {country.area}
      </div>
      <div>
        <b>languages:</b>
        <ul>
          {languageValues.map(languageValue => <li key={languageValue}>{languageValue}</li>)}
        </ul>
      </div>
      <div>
        <img src={flagUrl} alt={`Flag of ${country.name.common}`} style={{width: '150px'}} />
      </div>
      <CityWeather cityName={country.capital[0]} />
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
        <span key={countryName}>
        {countryName} <input type="button" value="show" onClick={() => setSelectedCountry(countryName)} />
        <br/>
        </span>
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
