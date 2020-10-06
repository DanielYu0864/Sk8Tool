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
    })
      .catch((err) => res.stats(401).json(err));

  });

  app.get('/add-spot', (req, res) => {
    res.render('add-spots');
  });
};
