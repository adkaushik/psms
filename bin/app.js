const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser');

const { PATH, SLOT_LIMIT } = require('./constants');
const fileWatcher = require('./fileWatcher');
const UserController = require('./controllers/UserController');

// middleware functions for the app
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

fileWatcher();

// router
app.get('/', UserController.findOccupied);
app.get('/history', UserController.findHistory);

module.exports = app;
