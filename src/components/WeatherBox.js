import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";

const WeatherBox = ({ weather }) => {
    if (weather) {
        return (
            <WeatherBoxWrap>
                <Location>
                    <FaMapMarkerAlt /> <p>{weather?.name}</p>
                </Location>
                <Description $fsize={"--font-lg"}>
                    <span>{weather?.main.temp} ℃</span> /{" "}
                    <span>{(weather?.main.temp * 1.8 + 32).toFixed(2)} ℉</span>
                </Description>
                <Description $fweight={"500"}>
                    {weather?.weather[0].description.toUpperCase()}
                </Description>
            </WeatherBoxWrap>
        );
    } else {
        return (
            <WeatherBoxWrap>
                <Loading></Loading>
            </WeatherBoxWrap>
        );
    }
};

export default WeatherBox;

const WeatherBoxWrap = styled.section`
    max-width: 700px;
    margin: 0 auto 40px;
    box-sizing: border-box;
    padding: 20px;
    border: 2px solid #fff;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    color: #fff;
`;

const Location = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 16px;
    font-size: var(--font-sm);

    & > p {
        margin-left: 6px;
        font-weight: 300;
    }
`;

const Description = styled.div`
    text-align: center;
    font-size: var(${(props) => props.$fsize || "--font-md"});
    font-weight: ${(props) => props.$fweight || "700"};
    margin-bottom: 25px;
`;

const Loading = styled.div`
    width: 50px;
    height: 50px;
    margin: 20px auto;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-bottom: 5px solid #fff;
    border-radius: 50%;

    animation: loading 1.5s linear infinite;

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
