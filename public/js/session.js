
var firebase = require('firebase');

firebase.auth().onAuthStateChanged(function(user) {
  if (req.session['user']) {
    
  } else {
   
  }
});
