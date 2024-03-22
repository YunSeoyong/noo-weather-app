import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const ButtonBox = ({
    getCurrentLocation,
    cities,
    city,
    setCity,
    getWeatherByCity,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCurrentLocation = () => {
        getCurrentLocation();
        setCity(null);
    };

    const handleCityLi = (city) => {
        setCity(city);
        setIsOpen(prev => !prev);
        getWeatherByCity(city);
    };
    
    return (
        <LocationBox>
            <CurrentLocation
                onClick={handleCurrentLocation}
            >
                Current Location
            </CurrentLocation>
            <LocationList>
                <SelectCity onClick={() => {setIsOpen(prev => !prev)}}>
                    <p>{city ? city : 'Select'}</p>
                    { isOpen ? <IoIosArrowUp /> : <IoIosArrowDown /> }
                </SelectCity>
                <ul
                    className={isOpen ? 'open' : ''}
                >
                    {
                        cities.map((i) => <li onClick={() => {handleCityLi(i)}}>{i}</li>)
                    }
                </ul>
            </LocationList>
        </LocationBox>
    );
};

export default ButtonBox;

const LocationBox = styled.section`
    display: flex;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 14px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
`;

const CurrentLocation = styled.button`
    display: block;
    height: 40px;
    padding: 0 12px;
    border: 1px solid #222;
    border-radius: 4px;
    font-size: var(--font-sm);
    font-weight: 300;
    color: #222;
    transition: 0.2s;

    &:hover {
        background-color: #222;
        color: #fff;
    }
`;

const LocationList = styled.div`
    position: relative;
    width: 140px;
    border-radius: 4px;
    font-size: var(--font-sm);
    font-weight: 300;
    transition: 0.2s;
    background-color: rgba(0, 0, 0, 0.5);

    ul {
        position: absolute;
        top: 32px;
        display: none;
        width: 140px;
        margin-top: 12px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.5);
        overflow: hidden;

        &.open {
            display: block;
        }

        li {
            padding: 6px 20px;
            cursor: pointer;
            color: #fff;
            list-style: none;
            transition: 0.2s;

            &:first-child {
                padding: 12px 20px 6px;
            }
            &:last-child {
                padding: 6px 20px 12px;
            }

            &:hover {
                background-color: rgba(0, 0, 0, 0.6);
            }
        }
    }
`;
    
const SelectCity = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    height: 26px;
    padding: 12px 20px 0;
    color: #fff;
    font-weight: 700;
    transition: 0.2s;

    &:hover {
        color: #222;
    }
`; 
