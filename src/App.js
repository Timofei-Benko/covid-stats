import React from 'react';
import { Route } from 'react-router-dom';
import Map from './components/Map';
import CountryFullStats from './components/CountryFullStats';
import CountryStatsComparison from './components/CountryStatsComparison';
import { css } from '@emotion/react';

/** @jsxRuntime classic */
/** @jsx jsx */

function App() {
  return (
    <div
      className="App"
      css={css`
        font-family: Poppins, sans-serif;
        html {
          background: gray;
        }
      `}
    >
      <Route path="/" exact component={Map}></Route>

      <Route
        path="/country-full-stats"
        exact
        component={CountryFullStats}
      ></Route>

      <Route
        path="/country-comparison"
        exact
        component={CountryStatsComparison}
      ></Route>
    </div>
  );
}

export default App;
