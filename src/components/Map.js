/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* global google */
import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import { useLocalStorage } from '../utils/customHooks';
import { getRouteDetails } from '../googleMapsFuncs/directions';

const addGeolocationToResults = (results, stations) => {
  results.forEach((detail) => {
    const detailsStationId = detail.originId;

    for (let i = 0; i < stations.length; i += 1) {
      const station = stations[i];
      if (detailsStationId === station.place_id) {
        const newDetail = { ...detail, geolocation: station.geometry.location };
        results = [...results, newDetail];
      }
    }
  });
  results = results.filter((e) => e.geolocation);

  return results;
};

const sortByTravelDuration = (results) => {
  results.sort((x, y) => parseInt(x.travelDuration.split(' ')[0], 10) - parseInt(y.travelDuration.split(' ')[0], 10));
  return results;
};

// const AnyReactComponent = ({ text }) => (
//   <div
//     style={{
//       height: '100px',
//       width: '100px',
//       background: 'rgba(0, 255, 0, 0.2)',
//       borderRadius: '50%',
//       display: 'inline-block',
//     }}
//   >
//     {text}
//   </div>
// );

const apiIsLoaded = (map, results) => {
  results.forEach((result) => {
    const { lat, lng } = result.geolocation;
    const circle = new google.maps.Circle({
      strokeColor: 'green',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: 'green',
      fillOpacity: 0.3,
      map,
      center: {
        lat,
        lng,
      },
      radius: 500,
    });
  });
};

const Map = () => {
  const [stations, setStations] = useLocalStorage('stations', []);
  const [stationDirections, setStationDirections] = useLocalStorage('stationDirections', []);

  useEffect(() => {
    // getStationsOnMount(stations, setStations);
    // getStationDirectionsOnMount(stationDirections, setStationDirections);
  }, []);

  let results = stationDirections.map((direction) => getRouteDetails(direction));
  results = addGeolocationToResults(results, stations);
  results = sortByTravelDuration(results);

  results = results.filter((result) => parseInt(result.travelDuration.split(' ')[0], 10) < 40);
  console.log(results);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCf2cM3g7U_wxxuzcWRrsm3F-Gw1nY2yZU' }}
        defaultCenter={{
          lat: 51.496,
          lng: -0.1,
        }}
        defaultZoom={15}
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map, results)}
      />
    </div>
  );
};

export default Map;
