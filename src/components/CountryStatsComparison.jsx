import React, { useState } from "react";
import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ResponsiveBar} from '@nivo/bar'
import { jsx, css } from "@emotion/react";

/** @jsxRuntime classic */
/** @jsx jsx */

export default function CountryStatsComparison() {

    const countryData = useSelector(store => store.comparison)

    const [barData, setBarData] = useState({
        data: generateData('cases'),
        barTitle: 'Total cases by country',
    })

    function generateData(statsItem) {
        return [
            ...countryData.map((country) => (
                {
                    "country": country.countryInfo.iso3,
                    [country.countryInfo.iso3]: country[statsItem],
                }
            ))
        ]
    }

    const switchStatsSubjectHandler = (statsItem, barTitle) => {
        setBarData({
                ...barData,
                data: generateData(statsItem),
                barTitle: barTitle,
            }
        )
    }

    const keys = countryData.map((country) => (country.countryInfo.iso3))

    const Bar = (barData) => (
        <ResponsiveBar
            data={barData}
            keys={keys}
            indexBy="country"
            colors={{ scheme: 'pastel1' }}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'barData.country',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )

    return (
        <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: gray;
            `}
        >
            <div
                css={css`
                    padding: 3rem;
                    border-radius: 10px;
                    background-color: #FFFFFF;
                `}
            >
                <div
                    css={css`
                    display: flex;
                `}
                >
                    <h1
                        css={css`
                        width: 100%;
                        text-align: center;
                        margin: 1rem;
                    `}
                    >
                        {
                            countryData.map((country, index) => (
                                index === countryData.length - 1
                                    ?
                                    <span
                                        key={`${new Date().getDate()}-${index}`}
                                    >{`${country.country} `}
                    </span>
                                    :
                                    <span
                                        key={`${new Date().getDate()}-${index}`}
                                    >{`${country.country}, `}
                    </span>
                            ))
                        }
                        Comparative Statistics
                    </h1>
                    <Button
                        variant={"contained"}
                        css={css`text-align: center`}
                        component={NavLink}
                        to='/'
                    >Back to Map
                    </Button>
                </div>
                <div
                    css={css`
                      display: flex;
                      justify-content: space-evenly;
                      margin: 3rem 1rem 2rem 1rem;
                    `}
                >
                    <Button
                        variant={"contained"}
                        onClick={() => switchStatsSubjectHandler('cases', 'Total Cases by Country')}
                    >Total Cases
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => switchStatsSubjectHandler('active', 'Total Active Cases by Country')}
                    >Total Active Cases
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => switchStatsSubjectHandler('deaths', 'Total Deaths by Country')}
                    >Total Deaths
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => switchStatsSubjectHandler('recovered', 'Total Recovered by Country')}
                    >Total Recovered
                    </Button>
                </div>
                <h3
                    css={css`text-align: center`}
                >{barData.barTitle}
                </h3>
                <div
                    css={css`
                    margin: 0 auto;
                    height: 500px;
                    width: 700px;
                `}
                >
                    {Bar(barData.data)}
                </div>
            </div>
        </div>
    )
}
