import React from 'react';
import { Route } from 'react-router-dom';
import Map from './components/Map';
import CountryFullStats from "./components/CountryFullStats";
import CountryStatsComparison from "./components/CountryStatsComparison";

function App() {
    return (
        <div className="App"
             style={{fontFamily: 'Poppins'}}
        >

            <Route
                path='/'
                exact
                component={Map}
            >
            </Route>

            <Route
                path='/country-full-stats'
                exact
                component={CountryFullStats}
            >
            </Route>

            <Route
                path='/country-comparison'
                exact
                component={CountryStatsComparison}
            >
            </Route>
        </div>
    );
}

export default App;
