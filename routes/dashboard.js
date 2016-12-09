var express = require('express');
var router = express.Router();
var firebase = require('firebase');
/* GET home page. */
router.get('/', function(req, res, next) {
	firebase.database().ref("tickets").orderByChild("user").equalTo(req.session['user']).on("value", function(snapshot){
		var post =snapshot.val();
		for (keys in post){
			post[keys].uid=keys;
		}


		
res.render('dashboard' , {user: req.session['user'], post:post});
		// res.send(snapshot.key());
	});
	
  

});

module.exports = router;

