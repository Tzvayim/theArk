var model = require('../models')
	, config = require('../config')

var title = config.development.express.title;
var subtitle = config.development.express.subtitle;

exports.index = function(req, res){
  res.render('index', { user: req.user, title: title, subtitle: subtitle });
};

exports.profile = function(req, res){
	res.render('profile', { user: req.user, title: title, subtitle: subtitle });
	console.log(req.user)
};
