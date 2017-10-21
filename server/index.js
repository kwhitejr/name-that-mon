'use strict';
const db = require('./models');
const app = require('./app');

const PORT = process.env.PORT || 4001;

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

db.sequelize
  .sync()
  .then(function () {
    app.listen(PORT, function () {
      console.log('listening on ' + PORT);
    });
  });
  