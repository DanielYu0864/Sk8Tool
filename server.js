// Dependencies
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
// sequelize db
const db = require('./models');

// Loop through root and get .env
// .env
const dotenv = require('dotenv');
const env = dotenv.config('/.env');
console.log(env.parsed.REACT_APP_OPEN_WEATHER_APIKEY);
console.log(env.parsed.REACT_APP_GOOGLE_MAP_APIKEY);


// Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// View engine set up
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Routes
// ======================================================================
require('./controllers/api-routes')(app, env);
require('./controllers/hbs-routes')(app, env);

db.sequelize.sync(/*{ force: true }*/).then(() => {
  app.listen(PORT, () => {
    console.log(`app listening on -> localhost:${PORT}`);
  });
});
