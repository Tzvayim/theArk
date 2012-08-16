
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { user: req.user, title: 'The Ark', subtitle: 'Bnei Noach Database' });
  //res.render('index');
};
