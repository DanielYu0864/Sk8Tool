module.exports = function(app) {
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/parks', (req, res) => {
        res.render('parks');
    });
    app.get('/shops', (req, res) => {
        res.render('shops');
    });


    app.get('/weather', (req, res) => {
        res.render('weather');
    });


}