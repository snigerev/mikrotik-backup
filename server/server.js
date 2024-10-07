const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');
require('moment-duration-format')
const backup = require('./app/controller/backup.controller.js').makeBackup

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(history());
app.use(cors(corsOptions))
const db = require('./app/config/db.config.js');
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
    //console.log('Drop and Resync with { force: false }'); //alter: true
    require('./app/controller/init.controller.js');
});

//
require('./app/route/user.route')(app);
require('./app/route/auth.route')(app);
require('./app/route/instance.route')(app);
require('./app/route/cron.route.js')(app);
require('./app/route/git.route.js')(app);
require('./app/route/group.route.js')(app);


const server = app.listen(3030, function () {

    const host = server.address().address
    const port = server.address().port
    console.log("Сервер резервного копирования MikroTik успешно запущен!", host, port)
})
