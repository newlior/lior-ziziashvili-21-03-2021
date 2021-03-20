import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Provider } from './Compements/Context/Context.js';
import Home from './Compements/Home/Home.js';
import Fav from './Compements/Fav/Fav.js';
import './App.css';

function App() {

  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let api_key = '?apikey=RK4yqSHHP1yZJAfWNShFKveV8tVKa2cs';
  let day, d = new Date();
  let n = d.getDay();
  const [cityWeather, setCityWeather] = useState({place: 'Tel-Aviv', temp: '', status:'', forcast: []});
  const [bol, setBol] = useState(false);
  const [favoriteArray, setFavoriteArray] = useState([]);


  let fetchWeatherCity = async (city)=>{
    let current_location = await fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete' + api_key + '&q=' + city);
    let current_location_js = await current_location.json();
    if(current_location_js[0] !== undefined){
      let current_location_key = current_location_js[0].Key;
      let current_status = await fetch('http://dataservice.accuweather.com/currentconditions/v1/' + current_location_key + api_key + '&details=true');
      let current_status_js = await current_status.json();
      let current_forcast = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + current_location_key + api_key + '&details=true&metric=true');
      let current_forcast_js = await current_forcast.json();
      let full_weather = {place: city, temp: current_status_js[0].Temperature.Metric.Value, 
        status: current_status_js[0].WeatherText, forcast: current_forcast_js.DailyForecasts};
      setCityWeather(full_weather);
    }else{
      alert('the city that entered is not exist or is misspelled');
    }
  }

  if(bol === false){
    fetchWeatherCity('Tel-Aviv');      
    setBol(true);
  }

  let dayName = (index)=>{
    if((n + index) >= 7){
      day = days[(n + index) - 7];
    }else{
      day = days[n + index];
    }
    return day.substring(0, 3);
  }

  let checkValue = (lastInpValue)=>{
    if ((lastInpValue >= 'a' && lastInpValue <= 'z') || (lastInpValue >= 'A' && lastInpValue <= 'Z')
     || lastInpValue === '-' || lastInpValue === ' ') {
      document.getElementById('alert').style.display = 'none';
    }else{
      document.getElementById('alert').style.display = 'block';
    }
  }

  let addFav = (currentCity, lastTemp)=>{
    let favPlaceArray = [];
    for (let i = 0; i < favoriteArray.length; i++) {
      favPlaceArray.push(favoriteArray[i].place);
    }
    if(favPlaceArray.includes(currentCity)){
      alert('this city is alredy saved in the favorites');
    }else{
      let favCityInfo = {place: currentCity, temp: lastTemp};
      favoriteArray.push(favCityInfo);
    }
  }

  let removeFav = (inp)=>{
    let newFavArray = [];
    for (let i = 0; i < favoriteArray.length; i++) {
      if (inp === favoriteArray[i].place) {
        let slieced = favoriteArray.slice(i, 1);
      }else{
        newFavArray.push(favoriteArray[i]);
      }
      console.log(newFavArray);
    }
    setFavoriteArray(newFavArray);
  }

  return (
    <Provider value= {{
      cityWeather: cityWeather,
      favoriteArray: favoriteArray,
        actions:{
          dayName: dayName,
          fetchWeatherCity: fetchWeatherCity,
          checkValue: checkValue,
          addFav: addFav,
          removeFav: removeFav,
        } 
    }}>
      <div className='App'>
        <Router>
          <header className="App-header">
            <nav>
              <Link to='/' className='links nav-buttons'>Home</Link>
              <Link to='/favorite' className='links nav-buttons'>Favorite</Link>
            </nav>
          </header>
          <Switch>
            <Route exact={true} path="/" component={()=>  <Home />} />
            <Route exact path="/favorite" component={()=> <Fav /> }/>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
