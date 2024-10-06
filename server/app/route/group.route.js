module.exports = function(app) {
    const group = require('../controller/group.controller.js');

    app.get('/api/getAllGroups', group.findAll);
    app.get('/api/getGroup', group.getGroup);
    app.post('/api/createGroup', group.createGroup);
    app.post('/api/updateGroup', group.updateGroup);
    app.post('/api/deleteGroup', group.delete);

}
