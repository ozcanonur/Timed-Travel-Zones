/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* global google */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import { useLocalStorage } from '../utils/customHooks';
import { travelDurationToIntMins, numberToColorHsl } from '../utils/utils';
import { getRouteDetails } from '../googleMapsFuncs/directions';

const apiIsLoaded = (map, results) => {
  const maxTravelDuration = _.max(results.map((e) => travelDurationToIntMins(e.travelDuration)));

  results.forEach((result) => {
    const { lat, lng } = result.geolocation;
    const travelDuration = travelDurationToIntMins(result.travelDuration);
    const color = numberToColorHsl(1 - travelDuration / maxTravelDuration, 0, 1);
    // eslint-disable-next-line no-unused-vars
    const circle = new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
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
  // eslint-disable-next-line no-unused-vars
  const [stations, setStations] = useLocalStorage('stations', []);
  // eslint-disable-next-line no-unused-vars
  const [stationDirections, setStationDirections] = useLocalStorage('stationDirections', []);

  const results = stationDirections.map((direction) => getRouteDetails(direction));
  // results = results.filter((result) => parseInt(result.travelDuration.split(' ')[0], 10) < 40);
  console.log(results);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCf2cM3g7U_wxxuzcWRrsm3F-Gw1nY2yZU' }}
        defaultCenter={{
          lat: 51.496,
          lng: -0.1,
        }}
        defaultZoom={13}
        onGoogleApiLoaded={({ map }) => apiIsLoaded(map, results)}
        yesIWantToUseGoogleMapApiInternals
      />
    </div>
  );
};

export default Map;
