module.exports = function(app) {
    const instance = require('../controller/instance.controller.js');

    app.get('/api/getAll', instance.findAll);
    app.get('/api/getInstance', instance.getInstance);
    app.post('/api/createInstance', instance.createInstance);
    app.post('/api/updateInstance', instance.updateInstance);
    app.post('/api/deleteInstance', instance.delete);

}
