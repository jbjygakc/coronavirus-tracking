import React from 'react';
import './App.css';
import LineGraph from './components/LineGraph.js';
import { useEffect, useState } from 'react';
import CovidSummary from './components/CovidSummary';
import axios from './components/axios';

function App() {

  const [totalconfirmed, setTotalconfirmed] = useState(0);
  const [newdeaths, setNewDeaths] = useState(0);
  const [totaldeaths, setTotaldeaths] = useState(0);
  const [loading, setLoading] = useState(false);
  const [covidsummary, setCovidsummary] = useState({});
  const [days, setDays] = useState(7);
  const [country, setCountry] = useState('');
  const [coronaCount, setCoronacount] = useState([]);
  const [label,setLabel]=useState([]);



  useEffect(() => {
    setLoading(true)
    axios.get(`/summary`)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          setTotalconfirmed(res.data.Global.TotalConfirmed)
          setNewDeaths(res.data.Global.NewDeaths)
          setTotaldeaths(res.data.Global.TotalDeaths)
          setCovidsummary(res.data);
        }
        console.log(res);
      })

      .catch(error => {
        console.log(error);
      })
  }, [])
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`.slice(-2); //012 -> 12
    const _date = d.getDate();
    return `${year}-${month}-${_date}`
  }

  const countryHandler = (e) => {
    setCountry(e.target.value)
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - days));
    console.log(from, to);
    getReportbydate(e.target.value, from, to)
  }


  const daysHandler = (e) => {
    setDays(e.target.value)
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate() - e.target.value));
    console.log(from, to);
    getReportbydate(country,from,to);
  }
  const getReportbydate = (countrySlug,from,to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
      .then(res => {

        console.log(res);
        const yAxiscorona = res.data.map(d => d.Cases);
        const xAxislabel= res.data.map(d => d.Date);
        const covidDetails =covidsummary.Countries.find(country => country.Slug=== countrySlug);

        setCoronacount(yAxiscorona)
        setLabel(xAxislabel);
        setTotalconfirmed(covidDetails.TotalConfirmed);
        setNewDeaths(covidDetails.NewDeaths);
        setTotaldeaths(covidDetails.TotalDeaths);

      })
      .catch(error => {
        console.log(error);
      })
  }

  if (loading) { return <p> Fetching Data from api.....</p> }

  return (
    <div className="App">
      <CovidSummary
        totalconfirmed={totalconfirmed}
        newdeaths={newdeaths}
        totaldeaths={totaldeaths}
        country={country}
      />
      <div>
        <select value={country} onChange={countryHandler}>
        <option value="">Select Country</option>
          {covidsummary.Countries && covidsummary.Countries.map(country =>
            <option key={country.Slug} value={country.Slug}>{country.Country}</option>
          )
          }
        </select>
        <select value={days} onChange={daysHandler}>
          <option value={"7"}>Last 7 days</option>
          <option value={"30"}>Last 30 days</option>
          <option value={"90"}>Last 90 days</option>

        </select>
      </div>
      <LineGraph
        yAxis={coronaCount} 
          label= {label}
        />
    </div>
  );
}

export default App;
