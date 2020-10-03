const db = require('../models');

module.exports = (app) => {
    // GET route for all of the spots data
    app.get('/api/spots', (req, res) => {
        // .findAll to get all the data from mySQL database
        db.spots.findAll({}).then(spots => res.json(spots));
    });
    // POST route for add new spots info
    app.post('/api/spots', (req, res) => {
        // .create to add new data to mySQL database
        db.spots.create({
            city: req.body.city,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            cross_street: req.body.cross_street,
            description: req.body.description,
            security_guards: req.body.security_guards,
            security_when: req.body.security_when
        }).then(spot => res.json(spot));
    });
    // PUT route for update spots info
    app.put('/api/spots', (req, res) => {
        // .update to update the data from mySQL database
        db.spots.update({
            city: req.body.city,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            cross_street: req.body.cross_street,
            description: req.body.description,
            security_guards: req.body.security_guards,
            security_when: req.body.security_when
        }, {
            // conditions
            where: {
                id: req.body.id
            }
        }).then(spot => res.json(spot));
    });
};
