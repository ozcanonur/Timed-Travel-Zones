/* global google */
import { getDirections, getDirectionsFromStations } from './directions';

import { getPlaces } from './places';

export const getRoutesOnMount = (routes, setRoutes) => {
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

export const getStationsOnMount = (stations, setStations) => {
  // Clapham North as the center
  const location = new google.maps.LatLng(51.482769, -0.114811);
  // Meters
  const radius = '5300';
  const type = ['subway_station'];

  if (stations.length === 0) {
    getPlaces(location, radius, type).then((results) => {
      setStations(results.flat());
    });
  }
};

export const getStationDirectionsOnMount = (stations, stationDirections, setStationDirections, start, end) => {
  const stationNameAndIds = stations.map((station) => {
    return { name: station.name, id: station.place_id };
  });

  if (stationDirections.length === 0) {
    getDirectionsFromStations(stationNameAndIds.slice(start, end)).then((res) => {
      setStationDirections([...stationDirections, ...res]);
    });
  }
};
