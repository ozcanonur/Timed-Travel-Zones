/* eslint-disable no-console */
/* global google */
import React, { useEffect } from 'react';
import { useLocalStorage } from './customHooks';
// import GoogleMapReact from 'google-map-react';

const getDirections = (originId, destinationId, travelMode, departureTime, modes) => {
  return new Promise((resolve, reject) => {
    const DirectionsService = new google.maps.DirectionsService();
    const options = {
      origin: { placeId: originId },
      destination: { placeId: destinationId },
      travelMode,
      transitOptions: {
        departureTime,
        modes,
      },
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      region: 'uk',
    };

    DirectionsService.route(options, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) resolve(result);
      else reject(status);
    });
  });
};

const getRouteDetails = (route) => {
  const departureTime = route.departure_time.value;
  const arrivalTime = route.arrival_time.value;
  const travelDuration = route.duration.text;
  const startAddress = route.start_address;
  const endAddress = route.end_address;
  const distance = route.distance.text;
  const travelSteps = route.steps.map((step) => {
    if (step.travel_mode === 'TRANSIT') return { type: step.transit.line.name, duration: step.duration.text };
    return { type: 'Walking', duration: step.duration.text };
  });

  return { startAddress, endAddress, departureTime, arrivalTime, travelDuration, distance, travelSteps };
};

const printRouteDetails = (route) => {
  const {
    startAddress,
    endAddress,
    departureTime,
    arrivalTime,
    travelDuration,
    distance,
    travelSteps,
  } = getRouteDetails(route);

  console.log(`Start address: ${startAddress}`);
  console.log(`End Address: ${endAddress}`);
  console.log(`Departure time: ${departureTime}`);
  console.log(`Arrival time: ${arrivalTime}`);
  console.log(`Duration: ${travelDuration}`);
  console.log(`Distance: ${distance}`);
  travelSteps.forEach((step, index) => {
    console.log(`${index + 1}: ${step.type}, ${step.duration}`);
  });
};

const Map = () => {
  const [routes, setRoutes] = useLocalStorage('routes', []);

  useEffect(() => {
    // Home
    const originId = 'ChIJK_5hqZ8EdkgRx1LypC0twDQ';
    // Rachel's job
    const destinationId = 'ChIJuy2PxKMIdkgR4Z37JsEU16Q';

    if (routes.length === 0) {
      getDirections(originId, destinationId, google.maps.TravelMode.TRANSIT, new Date(2020, 8, 1, 10, 30), [
        'SUBWAY',
      ]).then((directions) => {
        console.log('Got routes again');

        const firstRoute = directions.routes[0].legs[0];
        setRoutes([firstRoute]);
      });
    }
  }, [routes.length, setRoutes]);

  printRouteDetails(routes[0]);

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
