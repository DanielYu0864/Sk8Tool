// Dependencies
const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const db = require('./models');

// Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

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
