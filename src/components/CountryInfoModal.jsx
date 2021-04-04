import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Route} from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import { Button } from '@material-ui/core';

/** @jsxRuntime classic */
/** @jsx jsx */

export default function CountryInfoModal() {

    const countryData = useSelector(store => store.singleCountry);
    const countryComparisonData = useSelector(store => store.comparison);

    const dispatch = useDispatch();
    console.log(countryData)

    const addToSelectionHandler = () => {
        let isCountryAlreadyInState = false

        if (countryComparisonData.length > 0) {
            countryComparisonData.forEach((country) => {
                if (countryData.countryInfo.iso3 === country.countryInfo.iso3) {
                    isCountryAlreadyInState = true
                }
            })
        }

        if (isCountryAlreadyInState || countryComparisonData.length === 4) {
            return
        }

        dispatch({
            type: 'ADD_COUNTRY_TO_SELECTION',
            payload: countryData,
        })
    };

    const modalStyles = css`
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 20;
      width: 300px;
      margin: 1rem;
      padding: 1rem;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19),
                  0 6px 6px rgba(0,0,0,0.23);
      
      & h2 {
        margin: 0;
        font-weight: 400;
      }
      & img {
        width: 50px;
        object-fit: contain;
        border: 1px solid #000000;
      }
    `;

    return (
        <div className={'modal'}
             css={modalStyles}
        >
            {
                countryData ?
                    <>
                        <div css={css`
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            height: 55px;
                        `}>
                            <h2>{countryData.country}</h2>
                            <img src={countryData.countryInfo.flag} alt={`the flag of ${countryData.country}`}/>
                        </div>
                        <p>Total cases: {countryData.cases}</p>
                        <p>Total deaths: {countryData.deaths}</p>
                        <p>Total recovered: {countryData.recovered}</p>
                        <div
                            css={css`
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                        `}
                        >
                            <Button variant="contained"
                                    component={NavLink}
                                    to='/country-full-stats'
                            >See more
                            </Button>
                            <Button variant="contained"
                                    onClick={addToSelectionHandler}
                            >Add to selection
                            </Button>
                        </div>
                    </>
                    :
                    <h2>Click a country to see its COVID-19 statistics!</h2>
            }
        </div>
    )
};
