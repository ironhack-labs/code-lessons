require('dotenv').config();


const bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');

const app = express();




// Set up the database
require('./configs/db.config');

// Set up the sessions
const session = require("./configs/sessions.config")



// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


// Middleware
app.use(session)
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Routers
const routesConfig = require('./configs/routes.config');
app.use('/', routesConfig);


// Catch missing routes and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Catch all error handler
app.use((error, req, res) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  // render the error page
  res.status(error.status || 500);
  res.render('error');
});


module.exports = app;
