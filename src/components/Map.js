/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* global google */
import React, { useEffect } from 'react';
import { useLocalStorage } from '../utils/customHooks';
// eslint-disable-next-line no-unused-vars
import { getDirections, printRouteDetails } from '../googleMapsFuncs/directions';
import { getPlaces } from '../googleMapsFuncs/places';
// import GoogleMapReact from 'google-map-react';

const getRoutesOnMount = (routes, setRoutes) => {
  // Home
  const originId = 'ChIJK_5hqZ8EdkgRx1LypC0twDQ';
  // Rachel's job
  const destinationId = 'ChIJuy2PxKMIdkgR4Z37JsEU16Q';

  if (routes.length === 0) {
    getDirections(originId, destinationId, google.maps.TravelMode.TRANSIT, new Date(2020, 8, 1, 10, 30), [
      'SUBWAY',
    ]).then((directions) => {
      console.log('Got routes again...');

      const firstRoute = directions.routes[0].legs[0];
      setRoutes([firstRoute]);
    });
  }
};

const getStationsOnMount = (stations, setStations) => {
  // Clapham North as the center
  const location = new google.maps.LatLng(51.482769, -0.114811);
  // Meters
  const radius = '5300';
  const type = ['subway_station'];

  if (stations === []) {
    getPlaces(location, radius, type).then((results) => {
      console.log(results);
      setStations(results);
    });
  }
};

const Map = () => {
  const [routes, setRoutes] = useLocalStorage('routes', []);
  const [stations, setStations] = useLocalStorage('stations', []);

  useEffect(() => {
    getRoutesOnMount(routes, setRoutes);
    getStationsOnMount(stations, setStations);
  }, []);

  return (
    <div style={{ height: '1000', width: '100%' }}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCf2cM3g7U_wxxuzcWRrsm3F-Gw1nY2yZU' }}
        defaultCenter={{
          lat: 51.496,
          lng: -0.1,
        }}
        defaultZoom={15}
      /> */}
    </div>
  );
};

export default Map;
