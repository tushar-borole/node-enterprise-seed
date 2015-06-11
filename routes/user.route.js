var validation=require("../validations");
var service=require("../services");

console.log(validation.user.login)
module.exports = function (app, routes,authenticate) {

    app.post('/api/user', routes.user.createUser);
    app.post('/api/user', routes.user.createUser);
    app.post('/api/login',service.validation.validateRequest(validation.user.login), routes.user.login);
    app.get('/api/users',authenticate, routes.user.getAllUsers);



}