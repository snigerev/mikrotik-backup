module.exports = function(app) {
    const users = require('../controller/user.controller.js');

    app.post('/api/register', users.create);
    app.post('/api/login', users.login);

}
