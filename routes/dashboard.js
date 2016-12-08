var express = require('express');
var router = express.Router();
var firebase = require('firebase');
/* GET home page. */
router.get('/', function(req, res, next) {
	firebase.database().ref("tickets").on("value", function(snapshot){
		var post =snapshot.val();
		res.render('dashboard' , {user: req.session['user'], post:post});
		// res.send(snapshot.val());
	});
	
  

});

module.exports = router;

