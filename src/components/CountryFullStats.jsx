import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ResponsivePie } from '@nivo/pie';
import { Button } from "@material-ui/core";
import { css, jsx} from '@emotion/react';

/** @jsxRuntime classic */
/** @jsx jsx */

export default function CountryFullStats() {
    // use let and set country data to some country then reassign it with data from store
    const countryData = useSelector(store => store.singleCountry);

    const updateDate = new Date(+countryData.updated).toLocaleString();

    const affectedData = [
        {
            "id": "recovered",
            "label": "recovered",
            "value": +countryData.recovered,
            "color": "#39d676"
        },
        {
            "id": "active",
            "label": "active cases",
            "value": +countryData.active,
            "color": "#E6BE2B"
        },
        {
            "id": "deaths",
            "label": "deaths",
            "value": +countryData.deaths,
            "color": "#df0f35"
        },
    ]

    const getTestCoverage = () => {
        const uncoveredPopulation = (+countryData.population) - (+countryData.tests)

        if (uncoveredPopulation < 0) {
            return 0
        }

        return uncoveredPopulation
    }

    const testCoverageData = [
        {
            "id": "covered",
            "label": "covered by tests",
            "value": +countryData.tests,
            "color": "#39d676"
        },
        {
            "id": "uncovered",
            "label": "uncovered by tests",
            "value": getTestCoverage(),
            "color": "#919191"
        },
    ]

    const totalCasesCenteredMetric = ({ centerX, centerY }) => {

        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                }}
            >
                {countryData.cases}
            </text>
        )
    }

    const affectedPopulationPie = (data) => (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            padAngle={3}
            innerRadius={0.5}
            cornerRadius={16}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            enableRadialLabels={false}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="rgba(0, 0, 0, 0)"
            layers={['slices', 'sliceLabels', 'radialLabels', 'legends', totalCasesCenteredMetric]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                }
            ]}
        />
    )

    const getTestCoverageMetric = () => {
        const testCoverageMetric = +countryData.tests / +countryData.population * 100;

        if (testCoverageMetric < 1) {
            return testCoverageMetric.toFixed(2) + '%'
        }

        return parseInt(testCoverageMetric) + '%'
    }

    const testCoverageCenteredMetric = ({ centerX, centerY }) => {

        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                }}
            >
                {
                    getTestCoverageMetric()
                }
            </text>
        )
    }

    const testCoveragePie = (data) => (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            padAngle={3}
            innerRadius={0.5}
            cornerRadius={16}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            enableRadialLabels={false}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="rgba(0, 0, 0, 0)"
            layers={['slices', 'sliceLabels', 'radialLabels', 'legends', testCoverageCenteredMetric]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 30,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                }
            ]}
        />
    );

    const pieContainerStyles = css`
      position: relative;
      height: 500px;
      width: 500px;
      
      & h3 {
        margin: 0;
        text-align: center;
      }
    `;

    return (
        countryData
        &&
            <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  background: gray;
                  overflow: scroll;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 1rem 0;
                        padding: 3rem 3rem 2rem 3rem;
                        border-radius: 10px;
                        background: #FFFFFF;
                
                & img {
                  border: 1px solid black;
                }
            `}
                >
                    <div
                    >
                        <div css={css`
                              display: flex;
                              width: 100%;
                          `}
                        >
                            <img
                                css={css`
                                      height: 70px;
                                      margin-right: 1rem;
                                    `}
                                src={countryData.countryInfo.flag}
                                alt={`the flag of ${countryData.country}`}
                            />
                            <div css={css`
                                  display: flex;
                                  flex-direction: column;
                                  justify-content: space-between;
                                  width: 100%;
                      
                                    h1 {
                                      margin: 0;
                                    }
                              `
                            }>
                                <h1>{countryData.country} COVID-19 Statistics</h1>
                                <p>updated on {updateDate}</p>
                            </div>
                            <Button
                                variant={"contained"}
                                component={NavLink}
                                to='/'
                                css={css`text-align: center`}
                            > Back to map
                            </Button>
                        </div>
                    </div>
                    <div
                        css={css`
                    display: flex;
                    height: 500px;
                    padding-top: 2rem;
                    `}
                    >
                        <div
                            css={pieContainerStyles}
                        >
                            <h3>Afected Population</h3>
                            {affectedPopulationPie(affectedData)}
                        </div>
                        <div
                            css={pieContainerStyles}
                        >
                            <h3>Test Coverage</h3>
                            {testCoveragePie(testCoverageData)}
                        </div>
                    </div>
                    <div css={css`
                          display: flex;
                          flex-direction: column;
                          align-self: center;
                          margin-top: 3rem;
                          
                          & h3 {
                            margin: 0;
                          }
                          
                          & ul {
                            margin-top: 1rem;
                            padding-left: 20px;
                          }
                          
                          & li {
                            margin: 10px 0;
                            list-style-type: disk;
                          }
                        `}
                    >
                        <h3>Today's Statistics:</h3>
                        <ul>
                            <li>Cases: {countryData.todayCases}</li>
                            <li>Deaths: {countryData.todayDeaths}</li>
                            <li>Recovered: {countryData.todayRecovered}</li>
                        </ul>
                    </div>
                </div>
            </div>
    )
};
