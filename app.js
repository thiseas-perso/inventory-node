const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const categoriesRouter = require('./routes/categoriesRoutes');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', categoriesRouter);

module.exports = app;
