const db = require('../models');

module.exports = function (app) {
  app.get('/', (req, res) => {
    db.spots.findAll({}).then((data) => {
      // spots empty arr to contant data
      const spots = [];
      // loop through data and push to the spots arr
      for (let i = 0; i < data.length; i++) {
        spots.push(data[i].dataValues);
      }
      // render spots obj to view-spots.handlebars
      res.render('index', { spots });
    });

    console.log(process.env.WEATHER_API_KEY);
    console.log(process.env.GOOGLE_MAP_API_KEY);
  });

  app.get('/view-spots', (req, res) => {
    // .findAll to get all the data from mySQL database
    db.spots.findAll({}).then((data) => {
      // spots empty arr to contant data
      const spots = [];
      // loop through data and push to the spots arr
      for (let i = 0; i < data.length; i++) {
        spots.push(data[i].dataValues);
      }
      // render spots obj to view-spots.handlebars
      res.render('view-spots', { spots });
    });
  });

  app.get('/add-spot', (req, res) => {
    res.render('add-spots');
  });
};
