import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";
import { css, jsx } from "@emotion/react";

/** @jsxRuntime classic */
/** @jsx jsx */

export default function CountrySelectionModal() {

    const countrySelectionData = useSelector(store => store.comparison);
    const dispatch = useDispatch();

    const removeCountryHandler = (ISO3) => {
        dispatch({
            type: 'REMOVE_COUNTRY_FROM_SELECTION',
            payload: ISO3,
        })
    }

    const modalStyles = css`
      position: absolute;
      bottom: 0;
      left: 350px;
      z-index: 20;
      min-width: 300px;
      margin: 1rem;
      padding: 1rem;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19),
                  0 6px 6px rgba(0,0,0,0.23);
      
      & h2 {
        position: relative;
        margin: 0;
        font-weight: 400;
      }
    `;

    return (
        <div css={modalStyles}>
            <h2>Selected Countries:
                <span
                    css={css`
                          font-size: 1rem;
                          position: absolute;
                          right: 0;
                          top: 5px;
                        `}
                >{`${countrySelectionData.length}/4`}
                </span>
            </h2>

            {
                countrySelectionData.length !== 0
                ?
                    <>
                        <div css={css`
                          margin: 1rem 0;

                          & span {
                            margin-right: 5px;
                            padding: 5px;
                            border-radius: 5px;
                            background: #8cd2d3;
                            
                            & button {
                              margin-left: 5px;
                              background-color: transparent;
                              border: none;
                              cursor: pointer;
                              
                              &:focus {
                                outline: none;
                              }
                            }
                          }
                        `
                        }>
                            {
                                countrySelectionData.map((country, index) => (
                                    <span
                                        key={`${new Date().getDate()}-${country.countryInfo.iso3}`}
                                        >{country.country}
                                        <button
                                            onClick={() => removeCountryHandler(country.countryInfo.iso3)}
                                        >x
                                        </button>
                                    </span>
                                ))
                            }
                        </div>
                        <Button
                            variant={"contained"}
                            component={NavLink}
                            to={'/country-comparison'}
                        >Compare
                        </Button>
                    </>
                :
                null
            }

        </div>
    )
};
