var express = require('express');
var router = express.Router();
var firebase = require('firebase');
/* GET home page. */
router.get('/', function(req, res, next) {


	firebase.database().ref("tickets").on("value", function(snapshot){
		var post =snapshot.val();
		for (keys in post){
			post[keys].uid=keys;
		}

		
res.render('dashboard1' , {user: req.session['user'], post:post});
		// res.send(snapshot.key());
	});
	
  

});

module.exports = router;

