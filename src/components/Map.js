/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* global google */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
// import { env } from '../config';
import { useLocalStorage } from '../utils/customHooks';
import { travelDurationToIntMins, numberToColorHsl } from '../utils/utils';
import { getRouteDetails } from '../googleMapsFuncs/directions';

const addCircle = (map, result, maxTravelDuration) => {
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
};

const getInfoWindowString = (result) => {
  const totalWalkingTime = result.travelSteps
    .filter((step) => step.type === 'Walking')
    .map((step) => travelDurationToIntMins(step.duration))
    .reduce((total, amount) => total + amount);

  const totalTransitTime = result.travelSteps
    .filter((step) => step.type !== 'Walking')
    .map((step) => travelDurationToIntMins(step.duration))
    .reduce((total, amount) => total + amount);

  return `<div>
      <div><strong>${result.startAddress}</strong></div>
      <div>Duration: ${result.travelDuration}</div>
      <div>Walk: ${totalWalkingTime} mins.</div>
      <div>Transit: ${totalTransitTime} mins.</div>
    </div>`;
};

const addMarker = (map, result) => {
  const { geolocation, startAddress } = result;

  const infoWindow = new google.maps.InfoWindow({
    content: getInfoWindowString(result),
  });

  const marker = new google.maps.Marker({
    position: geolocation,
    map,
    title: startAddress,
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
};

const apiIsLoaded = (map, results) => {
  const maxTravelDuration = _.max(results.map((e) => travelDurationToIntMins(e.travelDuration)));

  results.forEach((result) => {
    addCircle(map, result, maxTravelDuration);
    addMarker(map, result);
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
    <div style={{ height: '1000px', width: '100%' }}>
      <GoogleMapReact
        // bootstrapURLKeys={{ key: env.KEY }}
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
