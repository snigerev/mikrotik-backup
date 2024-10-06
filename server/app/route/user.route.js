module.exports = function(app) {

    const users = require('../controller/user.controller.js');

    app.post('/api/user', users.create);
    app.get('/api/users', users.findAll);
    app.get('/api/getUser', users.getUser);
    app.post('/api/updateUser/:userId', users.update);
    app.post('/api/checkToken', users.checkToken)
    app.post('/api/deleteToken', users.deleteToken)
    app.delete('/api/user/:userId', users.delete);

}