import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { css } from '@emotion/react';
import countries from './../data/countries.json';
import CountryInfoModal from './CountryInfoModal';
import CountrySelectionModal from './CountrySelectionModal';

/** @jsxRuntime classic */
/** @jsx jsx */

function Map() {
  const countryDataStore = useSelector((store) => store.global.data);

  const dispatch = useDispatch();

  let data = useRef();
  data.current = countryDataStore;

  const handleCountryClick = (ISO_A3) => {
    const countryStats = data.current.find(
      (country) => country.countryInfo.iso3 === ISO_A3
    );

    if (!countryStats) {
      return;
    }

    dispatch({
      type: 'SET_COUNTRY_DATA',
      payload: countryStats,
    });
  };

  const countryEventsHandler = (country, layer) => {
    layer.on({
      mouseover: (ev) => {
        ev.target.setStyle({
          fillOpacity: 0.5,
          opacity: 0.5,
        });
      },
      mouseout: (ev) => {
        ev.target.setStyle({
          fillOpacity: 0,
          opacity: 0.1,
        });
      },
      click: (ev) => {
        console.log(ev);
        handleCountryClick(ev.target.feature.properties.ISO_A3);
      },
    });
  };

  const mapStyles = css`
    z-index: 1;
    width: 100vw;
    height: 100vh;
  `;

  const countryStyles = {
    fillColor: 'gray',
    fillOpacity: 0,
    color: 'black',
    weight: 0.1,
  };

  const mapInitState = {
    location: [53.7098, 27.9534],
    zoom: 4,
    minZoom: 2,
  };

  return (
    <>
      <MapContainer
        center={mapInitState.location}
        zoom={mapInitState.zoom}
        minZoom={mapInitState.minZoom}
        css={mapStyles}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          noWrap={true}
        />

        <GeoJSON
          data={countries.features}
          style={countryStyles}
          onEachFeature={countryEventsHandler}
        />
      </MapContainer>

      <CountryInfoModal />
      <CountrySelectionModal />
    </>
  );
}

export default Map;
