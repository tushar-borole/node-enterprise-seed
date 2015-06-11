var Q = require('q');
var validate = require("validate.js");
validate.Promise = Q.Promise;

exports.validateRequest = function (validationConstrain) {
    return function (req, res, next) {

            //validate async function for input validation
        validate.async(req.body, validationConstrain, {
            format: "flat"
        }).then(function () {
            next();
        }, function (errors) {
            return res.send({
                success: true,
                message: errors[0]
            });

        });

    };

}