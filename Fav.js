import React from 'react';
import './fav.css';
import { Consumer } from './../Context/Context.js'; 
import { Link } from 'react-router-dom';

export default function Fav(){
    return(
        <Consumer>
            {
                context =>{
                    return(
                        <div>
                            <div className='forcast-continer'>
                                {
                                    context.favoriteArray.map(item =>{
                                        return(
                                            <div className='city-weather weather-day' id={item.place}>
                                                <Link to='/' className='links fav-links' onClick={()=>{
                                                    context.actions.fetchWeatherCity(item.place);
                                                }}>
                                                    <p className='delete-btn'>
                                                    <span onClick={()=>{
                                                        context.actions.removeFav(item.place);
                                                    }}>X</span></p>
                                                    <p className='city-name'>{item.place}</p>
                                                    <p className='city-weather'>{Math.round(item.temp)}&deg;C</p>
                                                </Link>
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
