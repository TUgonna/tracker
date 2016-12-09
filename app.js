var express = require('express');
var session = require('express-session');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDuN91VA8zbUEWquDJamzDHo2BT5l3yxPU",
    authDomain: "issuetracker-eda61.firebaseapp.com",
    databaseURL: "https://issuetracker-eda61.firebaseio.com",
    storageBucket: "issuetracker-eda61.appspot.com",
    messagingSenderId: "351839136232"
  };
  firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref("tickets");




var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var app = express();

app.use(session({
  secret: '1234567',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));



app.use(bodyParser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);




function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
      res.redirect('/');
  }

}

app.use('/dashboard', requireLogin);

// app.use('/dashboard', dashboard);
// app.use('/login', login);
// app.use(function(req, res, next) {
//     if (req.session.user == null){
// // if user is not logged-in redirect back to login page //
//         res.redirect('/');
//     }   else{
//         next();
//     }
// });

  app.use('/dashboard', dashboard);
    app.use('/login', login);

app.post('/login', function(req, res, next) {

  var body = req.body;
  firebase.auth().signInWithEmailAndPassword(body.email1, body.password1).then(function (response) {
    req.session['user'] = response.email;
    ref.on("value", function(snapshot) {
   
}, function (error) {
   console.log("Error: " + error.code);
});
  res.redirect('/dashboard');
  }).catch(function(error){
    res.render('login' , {error:error});

  
  });

});

app.post('/create', function(req, res, next) {
  var fullDate = new Date();

var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
 
var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

var body = req.body;
  var param = {
    user: req.session['user'],
  status: "new",
  desc:body.issueDesc,
  prior:body.issuePriority,
  dept:body.issueDept,
  date: currentDate,
  update: currentDate
  };
   var x=ref.push(param).key;
    
    res.send(x);
  // res.redirect('/dashboard');

});



// app.get('/dashboard', function(req, res, next) {
//   // console.log(req.session);
//   var user = req.session.user;
//   // res.send(req.session.user);
//   res.render('dashboard' , {user: user});
// });


app.post('/logout', function(req, res, next) {
  firebase.auth().signOut().then(function() {
    req.session.destroy();
    res.redirect('/');
}, function(error) {
  res.send('Sign Out Error');
});
 
});

// app.post('/create', function(req, res, next) {
//   var body = req.body;
//    ref.push({
//   hey:"fdfd"
// });

// });


app.post('/register', function(req, res, next) {
var body = req.body;

if(body.confirmpassword==body.password){
firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then(function (response) {
  res.redirect('/dashboard');
  }).catch(function(error){
    res.send(error);
  
  });
}
else {
  return false;
}
});




// app.post('/login', function(req, res, next) {

//   var body = req.body;
//   firebase.auth().createUserWithEmailAndPassword(body.email, body.password).then(function (response) {
//     req.session.user = "UgoT";
//     res.redirect('/dashboard');
//   }).catch(function(error){
//     req.session.error = 'Access denied!';

//         res.redirect('/');
//   });

// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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