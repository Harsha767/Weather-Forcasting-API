import React from 'react';
import { Link } from "react-router-dom";
import "./App.css";

const About1 = () => {
  // URL of the weather image
  const weatherImageUrl = "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <div style={{backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Home</Link>
            <Link className="navbar-brand" to="/about">About</Link>
            <Link className="navbar-brand" to="/contact">Contact</Link>
            <Link className="navbar-brand" to="/">Logout</Link>
          </div>
        </nav>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <img src={weatherImageUrl} alt="Weather" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h1>About Weather App</h1>
              <p>This Weather App provides current weather and forecast information for locations around the world. It uses data from a weather API to display accurate and up-to-date weather information.</p>
              <p>With this app, you can search for any location and get detailed weather information, including temperature, humidity, wind speed, and more.</p>
              <p>Key Features:</p>
              <ul>
                <li>Real-time weather updates</li>
                <li>7-day weather forecast</li>
                <li>Search for weather by city or location</li>
                <li>Display of temperature in Celsius or Fahrenheit</li>
                <li>Responsive design for mobile and desktop</li>
              </ul>
              <p>The app is built using React.js and utilizes modern web development practices to ensure a smooth user experience.</p>
              <p>For any queries or feedback, please feel free to contact us.</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default About1;
