var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/candies-app');


// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'astarterwordtohelpcreatearandomandconsistentencryptionforallsessions'}));
app.use(passport.initialize());
app.use(passport.session());




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Add static middleware
app.use(express.static(__dirname + '/public'));


require("./config/passport")(passport)

var routes = require('./config/routes');

app.use(routes);

app.listen(3000, function(){
  console.log("I LIKE CANDY!");
});
