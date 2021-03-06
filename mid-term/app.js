const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const debug = require('debug')('app');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
const hbs = require('hbs');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded());
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// register partials
hbs.registerPartials(path.join(__dirname, '/views/admin/partials'));

// register helper
hbs.registerHelper('select', function(value, options) {
  return options
    .fn(this)
    .split('\n')
    .map(function(v) {
      const t = 'value="' + value + '"';
      return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"');
    })
    .join('\n');
});

app.use('/', indexRouter);
app.use('/admin', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// STEP1: Implement this start method to connect to MongoDB & then start Web server
app.start = (PORT, MONGO_URL) => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      debug('Database connect success');
      app.listen(PORT, () =>
        console.log('App started and listening on port', PORT)
      );
    })
    .catch(err => {
      debug('Database connection error:' + err);
    });
};

module.exports = app;
