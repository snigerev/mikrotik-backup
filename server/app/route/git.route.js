module.exports = function(app) {
    const git = require('../controller/git.controller.js');

    app.get('/api/getGit', git.getGit);
    app.post('/api/updateGit', git.updateGit);

}
