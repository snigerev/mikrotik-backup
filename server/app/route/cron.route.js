module.exports = function(app) {
    const cron = require('../controller/cron.controller.js');

    app.get('/api/getAllCron', cron.findAll);
    app.get('/api/getCron', cron.getCron);
    app.post('/api/createCron', cron.createCron);
    app.post('/api/updateCron', cron.updateCron);
    app.post('/api/deleteCron', cron.delete);

}
