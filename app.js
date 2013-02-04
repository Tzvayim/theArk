
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , util = require('util') // seems to be needed to keep session timeout low
  , passport = require('passport')
  , twitterStrat = require('passport-twitter').Strategy
  , nano = require('nano')
  , path = require('path')
	, config = require('./config')[process.env.NODE_ENV || 'production']
	;

var app = express();

passport.use(new twitterStrat({
    consumerKey: config.twitter.TWITTER_CONSUMER_KEY,
    consumerSecret: config.twitter.TWITTER_CONSUMER_SECRET,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    })
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session( config.express.secret ));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function(){
  nano = nano('http://nodejitsudb7653225711.iriscouch.com:5984/theark');
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
  nano = nano('http://localhost:5984/theark');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
};

function isExistingUser(req, res, next) {
  //if (){};
  db.head('rabbit', function(err, _, headers) {
    if (!err)
    console.log(headers);
  });
  res.redirect('/profile')
};

app.get('/', routes.index);

app.get('/profile', ensureAuthenticated, function(req, res) {
  res.render("profile", { user: req.user, title: 'The Ark', subtitle: 'Bnei Noach Database' });
});
 
app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res) {
  }
);

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/'
    , failureFlash: true
  }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  }
);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
