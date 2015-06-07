// Please check ./models/index.js for MySQL DB Connections
// Includes
//var restify = require('restify');
var db = require('./models');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config.js'); // get our config file
var authenticate = express.Router(); 
var jwt = require('jsonwebtoken');

// Setting Parameters to server
/*var server = restify.createServer({
  name: 'Todo',
    name: 'User'
});*/

// Initiating All Routes avaliable in ./route folder



// Using bodyparser for POST Request Parameters
//server.use(restify.bodyParser());
var app = express();
app.use(bodyParser.json());
app.set('superSecret', config.secret); 



// route middleware to verify a token
authenticate.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});




var routes =require('./controllers');
require('./routes')(app,routes,authenticate);




 // Creating Tables or Initiating Connections
 db
.sequelize
.sync({ force: false})
.complete(function(err) {
  if (err) {
    throw err;
  } else {
    // Listening in 8080 Port
	app.listen(8080);
	console.log("Server started: http://localhost:8080/");

      
  }
});
