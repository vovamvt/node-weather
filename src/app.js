const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vova',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Vova',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is the help page!',
    title: 'Help page',
    name: 'Vova',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address was provided',
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitute, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitute, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    },
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'help article not found',
    title: '404',
    name: 'Vova',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'page not found',
    title: '404',
    name: 'Vova',
  });
});

app.listen(port, () => {
  console.log('Express server listening on port 3000' + port);
});
