const env = require('./env.js');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');



const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "/db/database.sqlite",
    dialectModule: sqlite,
    logging: false,
  });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/users.model.js')(sequelize, Sequelize);
db.token = require('../model/token.model')(sequelize, Sequelize);
db.instance = require('../model/instance.model')(sequelize, Sequelize);
db.cronjob = require('../model/cron.model')(sequelize, Sequelize);
db.git = require('../model/git.model')(sequelize, Sequelize);
db.group = require('../model/group.model')(sequelize, Sequelize);

module.exports = db;