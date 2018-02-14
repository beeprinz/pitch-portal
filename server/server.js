const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const public = path.join(__dirname, '..', 'public');
const dist = path.join(__dirname, '..', 'dist');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(express.static(dist));
app.use(express.static(public));


app.get('*', (req, res) => {
  res.sendFile(path.join(public, 'index.html'));
});

module.exports = app;
