const { json } = require('sequelize')
const db = require('../models');



module.exports = function(app) {

    // GET route for all of the spots data
    app.get('/api/spots',(req, res) => {
        // .findAll to get all the data from mySQL database
        db.spots.findAll({}).then(spots => res.json(spots));
    });
    // POST route for add new spots info
    app.post('/api/spots', (req, res) => {
        // .create to add new data to mySQL database
        db.spots.create({
            city: req.body.city,
            first_cross_street : req.body.first_cross_street,
            second_cross_street: req.body.second_cross_street,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            description: req.body.description,
            security_guards: req.body.security_guards
        }).then(spot => res.json(spot));
    });
    // PUT route for update spots info
    app.put('/api/spots', (req, res) => {
        // .update to update the data from mySQL database
        db.spots.update({
            city: req.body.city,
            first_cross_street : req.body.first_cross_street,
            second_cross_street: req.body.second_cross_street,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            description: req.body.description,
            security_guards: req.body.security_guards
        }, {
            // conditions
            where: {
                id: req.body.id
            }
        }).then(spot => res.json(spot));
    });
};