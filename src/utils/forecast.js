const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=f64bf7acae4ac239f11be0bab44bf554&query=' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          'It is currently' +
          body.current.temperature +
          'degrees out. It feels like' +
          body.current.feelslike +
          'degrees out.',
        'and humidity is' + body.current.weather_descriptions.humidity + '%',
      );
    }
  });
};

module.exports = forecast;
