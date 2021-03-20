import React from 'react';
import './home.css';
import { Consumer } from './../Context/Context.js'; 


export default function Home(){

    return(
        <Consumer>
            {
                context =>{
                    return(
                        <div>
                            <input className='inp' type='text' defaultValue={context.cityWeather.place} id='inp' 
                                onChange={(e)=>{
                                    let inpValue = e.target.value;
                                    let lastInpValue = inpValue.charAt(inpValue.length - 1);
                                    context.actions.checkValue(lastInpValue);
                                }}/>
                            <span className='button' onClick={()=>{
                                context.actions.fetchWeatherCity(document.getElementById('inp').value);
                            }}>Enter</span>
                            <p id='alert'>use only english letters</p>
                            <div className='flex-div'>
                                <div className='inline'>
                                    <p className='current-city-name'>{context.cityWeather.place}</p>
                                    <p className='current-city-weather'>{Math.round(context.cityWeather.temp)}&deg;C</p>
                                </div>
                                <p className='button' id='fav-btn' onClick={()=>{
                                    context.actions.addFav(context.cityWeather.place, context.cityWeather.temp);
                                }}>Add To Favorite</p>
                            </div>
                            <h3 className='current-city-status'>{context.cityWeather.status}</h3>
                            <div className='forcast-continer'>
                                {
                                    context.cityWeather.forcast.map((item, index) =>{
                                        return(
                                            <div className='weather-day' key={'day' + index}>
                                                <p className='day-date'>{item.Date.substring(0, 10)}</p>
                                                <p className='day-name'>{context.actions.dayName(index)}</p>
                                                <p className='day-weather'>
                                                    {Math.round((item.Temperature.Maximum.Value + item.Temperature.Minimum.Value) / 2)
                                                }&deg;C</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
            			</div>
                    );
                }
            }
        </Consumer>
    )
}
