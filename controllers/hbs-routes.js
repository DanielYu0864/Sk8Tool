module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
        console.log(process.env.WEATHER_API_KEY);
        console.log(process.env.GOOGLE_MAP_API_KEY);
    });

    app.get('/view-spots', (req,res) => {
        res.render('view-spots');
    });

    app.get('/add-spot', (req, res) => {
        res.render('add-spots')
    });

}