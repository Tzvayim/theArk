// Module dependencies

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, util = require('util') // seems to be needed to keep session timeout low
	, passport = require('passport')
	, twitterStrat = require('passport-twitter').Strategy
	, nano = require('nano')
	, path = require('path')
	, config = require('./config')

var app = express();

app.configure('production', function(){
	config = config['production']
	nano = nano(config.couchdb.couchdbURL)
});

app.configure('development', function(){
	app.use(express.errorHandler());
	app.locals.pretty = true;
	config = config['development']
	nano = nano(config.couchdb.couchdbURL)
});

//Database Initializer
nano.db.create('the_ark', function(err, body) {
	if (!err) {
		console.log('database the_ark created');
	}
	else {
		console.error(err)
	}
});

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
  app.use(express.session( config.express.session ));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
};

function isExistingUser(req, res, next) {
  //if (){};
	//head is called to just return headers; faster than a get
  db.head('rabbit', function(err, _, headers) {
    if (!err)
    console.log(headers);
  });
  res.redirect('/profile')
};

app.get('/', routes.index);
app.get('/profile', ensureAuthenticated, routes.profile);

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
