/* global google */
export const getPlaceDetails = (id) => {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    const service = new google.maps.places.PlacesService(div);

    service.getDetails({ placeId: id }, (results, status) => {
      if (status === 'OK') resolve(results);
      else reject(status);
    });
  });
};

export const getPlace = (query, fields, locationBias) => {
  return new Promise((resolve, reject) => {
    const request = {
      query,
      fields,
      locationBias,
    };

    const div = document.createElement('div');
    const service = new google.maps.places.PlacesService(div);

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) resolve(results);
      else reject(status);
    });
  });
};

export const getPlaces = (location, radius, type, name) => {
  return new Promise((resolve, reject) => {
    const request = {
      location,
      radius,
      type,
      name,
    };

    const div = document.createElement('div');
    const service = new google.maps.places.PlacesService(div);

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) resolve(results);
      else reject(status);
    });
  });
};
