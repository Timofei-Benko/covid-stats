import { MutableRefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Leaflet from 'leaflet';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import countriesGeoJSON from '../../data/countriesGeoJSON.json';
import { CountrySelectionModal } from '../CountrySelectionModal';
import { TRootState } from '../../redux/store';

const MAP_INIT_STATE = {
  location: [53.7098, 27.9534],
  zoom: 4,
  minZoom: 2,
};

const COUNTRY_STYLES = {
  fillColor: 'gray',
  fillOpacity: 0,
  color: 'black',
  weight: 0.1,
};

const MAP_BOUNDS = Leaflet.latLngBounds(
  Leaflet.latLng(-89.98155760646617, -180),
  Leaflet.latLng(89.99346179538875, 180)
);

function InteractiveMap() {
  const countryDataStore = useSelector(
    (state: TRootState) => state.global.data
  );
  const dispatch = useDispatch();

  let data: MutableRefObject<any[] | undefined> = useRef();
  data.current = countryDataStore;

  function handleCountryClick(ISO_A3) {
    const countryStats = data.current?.find(
      (country) => country.countryInfo.iso3 === ISO_A3
    );

    if (!countryStats) {
      return;
    }

    dispatch({
      type: 'SET_COUNTRY_DATA',
      payload: countryStats,
    });
  }

  function countryEventsHandler(_, layer) {
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
  }

  return (
    <>
      <MapContainer
        // @ts-expect-error
        // center prop works as expected but doesn't seem to exist on type def
        center={MAP_INIT_STATE.location}
        zoom={MAP_INIT_STATE.zoom}
        minZoom={MAP_INIT_STATE.minZoom}
        maxBoundsViscosity={1.0}
        maxBounds={MAP_BOUNDS}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          noWrap={true}
        />
        <GeoJSON
          // @ts-expect-error
          // something's wrong with how json module gets resolved
          data={countriesGeoJSON.features}
          style={COUNTRY_STYLES}
          onEachFeature={countryEventsHandler}
        />
      </MapContainer>
      <CountrySelectionModal />
    </>
  );
}

export { InteractiveMap };
