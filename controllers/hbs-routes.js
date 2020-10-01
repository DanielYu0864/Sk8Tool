const db = require('../models');
module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
        console.log(process.env.WEATHER_API_KEY);
        console.log(process.env.GOOGLE_MAP_API_KEY);
    });

    app.get('/view-spots', (req,res) => {

            // .findAll to get all the data from mySQL database
            db.spots.findAll({}).then(spots => {
                console.log(spots);
                console.log(res.json(spots[0]));

                res.render('view-spots', spots);
            });

    });

    app.get('/add-spot', (req, res) => {
        res.render('add-spots')
    });

}