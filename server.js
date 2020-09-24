const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const db = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view-engine', 'handlebars');


// db.sequelize.sync({ forec: true }).then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app listening on -> localhost:${PORT}`);
  });
// });
