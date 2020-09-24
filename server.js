const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

const db = require('./models');

app.use(express.static('public'));
db.sequelize.sync({ forec: true }).then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app listening on -> localhost:${PORT}`);
  });
});
