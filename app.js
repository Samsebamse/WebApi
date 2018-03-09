const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const adminRoutes = require('./api/admin');
const clientRoutes = require('./api/client');

app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

app.use(function(request, response, next){
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use(function(error, request, response, next){
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
