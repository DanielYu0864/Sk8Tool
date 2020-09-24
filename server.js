const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const db = require('./models');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require('./routes/api-routes')(app);

app.get('/', (req, res) => {
  res.render('index');
});

db.sequelize.sync({ forec: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`app listening on -> localhost:${PORT}`);
  });
});
