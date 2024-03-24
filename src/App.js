import { useEffect, useState } from "react";
import styled from "styled-components";

import "./App.css";

import WeatherBox from "./components/WeatherBox";
import ButtonBox from "./components/ButtonBox";

const cities=['Seoul', 'New York', 'Tokyo', 'Paris', 'London', 'Hong Kong', 'Brasilia', 'Beijing', 'Moscow', 'Singapore'];

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiKey = process.env.REACT_APP_WEATHER_KEY;

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherByCurrentLocation(lat, lon);
        });
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        setLoading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("데이터를 불러오지 못하고 있습니다.");
            }
            const data = await response.json();
            setWeather(data);
            setLoading(false);
        } catch (error) {
            console.error("Fetch Data Error :", error);
        }
    };

    const getWeatherByCity = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        setLoading(true);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("데이터를 불러오지 못하고 있습니다.");
            }
            const data = await response.json();
            setWeather(data);
            setLoading(false);
        } catch (error) {
            console.error("Fetch Data Error :", error);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if(city === null) {
            getCurrentLocation();
        } else {
            getWeatherByCity(city);
        }
    }, [city]);
    
    return (
        <div
            className="App"
            style={
                weather
                    ? {
                          backgroundImage: `url(/assets/bg-${weather?.weather[0]?.main}.jpg)`,
                      }
                    : {
                          background: `linear-gradient(327deg, rgba(191,234,255,1) 7%, rgba(105,194,255,1) 100%)`,
                      }
            }
        >
            <h1>What is the weather like?</h1>
            <WeatherBox weather={weather} loading={loading} />
            <ButtonBox
                getCurrentLocation={getCurrentLocation}
                cities={cities}
                city={city}
                setCity={setCity}
                getWeatherByCity={getWeatherByCity}
            />
        </div>
    );
}

export default App;
