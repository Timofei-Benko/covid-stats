import React from 'react';
import { useState } from 'react'
import './App.css';

import Map from './components/Map';
import Sidebar from "./components/Sidebar";

function App() {

    const [ countryData, setCountryData ] = useState(null)

    return (
        <div className="App">
            <Map
                setCountryData={setCountryData}
            />
            <Sidebar
                data={countryData}
            />
        </div>
    );
}

export default App;
