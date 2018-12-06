var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var articlesRouter = require('./routes/articles');
var registrationsRouter = require('./routes/registrations');
var sessionsRouter = require('./routes/sessions');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({secret: 'changeme'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libraries/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(function(req, res, next) {
  res.locals.flash = req.flash();
  res.locals.current_user = req.user;
  next();
})

function requireAdmin(req, res, next) {
  if (req.user) {
    if (req.user.admin) {
      next();
    } else {
      req.flash('error', 'You are not allowed to see this page.');
      res.redirect('/');
    }
  } else {
    req.flash('error', 'You must be logged in as an admin to see this page.');
    res.redirect('/login');
  }
}

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/articles', requireAdmin);
app.use('/articles', articlesRouter);
app.use('/register', registrationsRouter);
app.use('/login', sessionsRouter);
app.use('/logout', function(req, res, next) {
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = "Error";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
