// Dependencies
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
// sequelize db
const db = require('./models');

// Loop through root and get .env
const dotenv = require('dotenv').config();

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
require('./controllers/api-routes')(app);
require('./controllers/hbs-routes')(app);



db.sequelize.sync(/*{ force: true }*/).then(() => {
  app.listen(PORT, () => {
    console.log(`app listening on -> localhost:${PORT}`);
  });
});
