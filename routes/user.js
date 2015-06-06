module.exports = function (app, routes) {

    app.post('/api/user', routes.user.createUser);
    app.post('/api/user', routes.user.createUser);
    app.post('/api/login', routes.user.login);
    app.get('/auth/users', routes.user.getAllUsers);



}