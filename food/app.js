var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var session = require("express-session");

var indexRouter = require('./routes/index');
var paymentRouter = require('./routes/get.payment');
var checkoutRouter = require('./routes/checkout');
var emailGuestRouter = require('./routes/post.emailGuest');
var drinksRouter = require('./routes/get.product-drinks');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/get.news');
var removeEmailClientRouter = require('./routes/post.removeEmailClient');
var policyFaqRouter = require('./routes/get.policy-faq');
var aboutRouter = require('./routes/get.about-us');
var contactRouter = require('./routes/get.contact');
var paymentbillRouter = require('./routes/get.paymentbill');
var adminRouter = require('./routes/get.admin');
var emailRouter = require('./routes/get.email');
var signinFacebookRouter = require('./routes/signinFacebook');

var infoAPI = require("./routes/apiInfo.js")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
                { secret: 'coppycat',
                  resave: false,
                  saveUninitialized: false,
                  cookie:{
                    expires: new Date(253402300000000)
                  }
                }
              ));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy(infoAPI, function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    })|| new LocalStrategy(function(username, password, done) {
        
    })
    )
passport.serializeUser((user, done)=>{
  done(null, user)
})
passport.deserializeUser((id, done)=>{
  done(null, id)
})
app.route("/facebook").get(passport.authenticate("facebook"));
app.use('/signinFacebook', signinFacebookRouter);
app.use('/payment', paymentRouter);
app.use('/sendmail', emailGuestRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/product-drinks', drinksRouter);
app.use('/check-out', checkoutRouter);
app.use('/policy-faq', policyFaqRouter);
app.use('/about-us', aboutRouter);
app.use('/contact-us', contactRouter);
app.use('/news', newsRouter);
app.use('/paymentbill', paymentbillRouter);
app.use('/removeemail', removeEmailClientRouter);
app.use('/email-guest', emailRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
