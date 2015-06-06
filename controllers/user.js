var db = require('../models');
var winston = require('winston');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');

// POST: /api/user
/*Create user*/
exports.createUser = function (req, res, next) {

    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    }


    db.User.create(user).success(function (todo) {
        res.send(todo);
        return next();
    });

    //return next();


};

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
exports.login = function (req, res, next) {

    // find the user
    db.User.findAll({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).success(function (todo) {
     
        var token = jwt.sign(todo, config.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.send({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
        return next();
    })
};

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
exports.getAllUsers = function (req, res, next) {

    // find the user
    db.User.findAll().success(function (data) {


        // return the information including token as JSON
        res.send(data);
        return next();
    })
};

