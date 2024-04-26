import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Search from "./search/search";
import CurrentWeather from "./current-weather/current-weather";
import Forecast from "./forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

// Import your logo images or SVG icons
import homeIcon from "./icons8-home.svg";
import aboutIcon from "./icons8-about.svg";
import contactIcon from "./icons8-contacts.svg";
import logoutIcon from "./logout.svg";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [validLocation, setValidLocation] = useState(true); // Track location validity
  const [optionsDisplayed, setOptionsDisplayed] = useState(true); // Track if options are displayed

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(response => response.json())
      .then(weatherResponse => {
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        
        const temperature = weatherResponse.main.temp;
        const weatherCondition = weatherResponse.weather[0].main;

        let imageUrl = "";

        
          if (temperature < 10) {
            imageUrl = "https://wallpapers.com/images/hd/snowy-weather-in-city-tb69n17frxerk0kx.jpg";
          } else if (temperature >= 10 && temperature < 30) {
            imageUrl = "https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg";
          } else if(temperature>30){
            imageUrl = "https://i.pinimg.com/originals/9a/ae/e7/9aaee76c5d7a0541153609f0c22bcc85.jpg";
          
        } else if (weatherCondition === "Rain") {
          imageUrl = "https://wallpapercave.com/wp/wp5835019.jpg";
        } else {
          imageUrl = "https://wallpapercave.com/wp/wp10102348.jpg";
        }

        setBackgroundImage(`url(${imageUrl})`);
        setValidLocation(true); // Location is valid
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setValidLocation(false); // Location is invalid
      });

    fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      .then(response => response.json())
      .then(forecastResponse => {
        setForecast(forecastResponse);
      })
      .catch(error => {
        console.error("Error fetching forecast data:", error);
      });
  };

  useEffect(() => {
    // Set default background image on component mount
    setBackgroundImage("url(https://wallpapercave.com/wp/wp10102348.jpg)");
  }, []);

  // Check if options are displayed in search
  const handleOptionsDisplayed = (status) => {
    setOptionsDisplayed(status);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-left text-center vh-100" style={{ backgroundImage }}>
        <nav className="navbar navbar-light bg-light navbar-expand-lg navbar-transparent" style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }} >
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/home">
                <img src={homeIcon} alt="Home" className="nav-icon" /> Home
              </Link>
              <Link className="navbar-brand" to="/about">
                <img src={aboutIcon} alt="About" className="nav-icon" /> About
              </Link>
              <Link className="navbar-brand" to="/contact">
                <img src={contactIcon} alt="Contact" className="nav-icon" /> Contact
              </Link>
            </div>
            <div className="navbar-collapse justify-content-end">
              <Link className="navbar-brand" to="/">
                 LogOut
              </Link>
            </div>
          </div>
        </nav>
        <h1>Weather </h1>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="scrollable-container">
                <Search onSearchChange={handleOnSearchChange} onOptionsDisplayed={handleOptionsDisplayed} />
                {!optionsDisplayed && !validLocation && <p style={{ color: 'red' }}>Enter valid location</p>}
                {validLocation && currentWeather && <CurrentWeather data={currentWeather} />}
                {validLocation && forecast && <Forecast data={forecast} />}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;
