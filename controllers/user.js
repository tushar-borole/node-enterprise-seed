var db = require('../models');
var winston = require('winston');
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');
var bcrypt = require('bcryptjs');

// POST: /api/user
/*Create user*/
exports.createUser = function (req, res, next) {

    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt

    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
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
            username: req.body.username
        }
    }).success(function (data) {
        console.log("inn");
        console.log(data[0].password);
        var comparePassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (comparePassword) {

            var token = jwt.sign(data, config.secret, {
                expiresInMinutes: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.send({
                error: false,
                message: 'Enjoy your token!',
                token: token
            });
             return next();
        } else {
            res.send({
                error: true,
                message: 'Invalid Password'
            });
             return next();
        }
       
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