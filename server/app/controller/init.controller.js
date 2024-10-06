const db = require('../config/db.config.js');
const User = db.users;
const userController = require('../controller/user.controller.js')
const Group = db.group;
const groupController = require('./group.controller.js');

User.findOne({where: {name: 'admin'}}).then((resp) => {
    if(resp == null) {
        userController.createFromService({body:{name: 'admin',password: '123456'}});
        console.log('defaut user add')
    } else {
        console.log('User exist')
    }
});

Group.findOne({where: {name: 'Main'}}).then((resp) => {
    if(resp == null) {
        groupController.createGroupFromInit({body: {name: 'Main', default: 1}});
        console.log('Defaut group add')
    } else {
        console.log('Default group exist')
    }
});