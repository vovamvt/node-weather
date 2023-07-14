const request = require('request');

const geocode = (address, callback) => {
  const url = 'http://api.weatherstack.com/' + address + '.json';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    }
    // else if (body.features.length === 0) {
    //   callback('No features found', undefined);
    // } else {
    //   callback(undefined, {
    //     latitude: body.features[0].center[0],
    //     longitude: body.features[0].center[1],
    //     location: body.features[0].place_name,
    //   });
    // }
  });
};

module.exports = geocode;
