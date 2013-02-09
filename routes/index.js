
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'The Ark', subtitle: 'Bnei Noach Database' });
};

exports.profile = function(req, res){
	res.render('profile', { user: req.user, title: 'The Ark', subtitle: 'Bnei Noach Database' });
	console.log(req.user)
};
