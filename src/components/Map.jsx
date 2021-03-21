import {useEffect, useState} from 'react';
import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Map.css'
import countries from './../data/countries.json'

export default function Map(props) {

    const {
        setCountryData,
    } = props

    const [countriesData, setCountriesData] = useState([])

    useEffect(() => {
        async function getGeoJSON() {
            try {
                const response = await fetch('https://corona.lmao.ninja/v2/countries');
                const data = await response.json()
                console.log(data)
            } catch (e) {
                console.error(`Failed to fetch countries: ${e.message}`, e);
            }
        }
        getGeoJSON().then(json => setCountriesData(json))
    }, [])

    const handleCountryClick = (ISO_A3) => {
        console.log(ISO_A3)

        if (countriesData.length !== 0) {
            const countryInfo = countriesData.find((country) => countryInfo.iso3 === ISO_A3)
            console.log(countryInfo)
        } else {
            console.error('data has not been set')
        }
    }

    const countryEventsHandler = (country, layer) => {
        layer.on({
            mouseover: (ev) => {
                ev.target.setStyle({
                    fillOpacity: 0.5,
                    opacity: 0.5,
                })
            },
            mouseout: (ev) => {
                ev.target.setStyle({
                    fillOpacity: 0,
                    opacity: 0.1,
                })
            },
            click: (ev) => {
                handleCountryClick(ev.target.feature.properties.ISO_A3)
            }
        })
    }

    const countryStyle = {
        fillColor: 'gray',
        fillOpacity: 0,
        color: 'black',
        weight: 0.1,
    };

    const mapInitState = {
        location: [53.7098, 27.9534],
        zoom: 4,
    };

    return (
        <MapContainer center={mapInitState.location}
                      zoom={mapInitState.zoom}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
                       attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
            />

            <GeoJSON
                data={countries.features}
                style={countryStyle}
                onEachFeature={countryEventsHandler}
            />

        </MapContainer>
    )
};
