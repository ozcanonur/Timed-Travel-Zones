/* eslint-disable no-console */
/* global google */
export const getDirections = (originId, destinationId, travelMode, departureTime, modes) => {
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

export const printRouteDetails = (route) => {
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