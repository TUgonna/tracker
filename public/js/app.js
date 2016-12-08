'use strict';
var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var firebase = require('firebase');
// var config = {
//     apiKey: "AIzaSyDuN91VA8zbUEWquDJamzDHo2BT5l3yxPU",
//     authDomain: "issuetracker-eda61.firebaseapp.com",
//     databaseURL: "https://issuetracker-eda61.firebaseio.com",
//     storageBucket: "issuetracker-eda61.appspot.com",
//     messagingSenderId: "351839136232"
//   };
//   firebase.initializeApp(config);

// var db = firebase.database();
// var ref = db.ref("tickets");
  var currentUser;



window.addEventListener('load', function() {
  firebase.auth().onAuthStateChanged(onAuthStateChanged);
}, false);