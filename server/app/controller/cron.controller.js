const db = require('../config/db.config.js');
const Cron = db.cronjob


exports.findAll = (req, res) => {
    Cron.findAll().then(cron => {
        res.send(cron);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.getActive = async () => {
    await Cron.findAll({where: {active: true}}).then((resp) => {
        return resp
    })
}

exports.getCron = (req, res) => {
    Cron.findOne({where: {id: req.body.id}}).then((resp) => {
        res.status(200).send(resp)
    })
};

exports.createCron = (req, res) => {
    Cron.create({
        name: req.body.name,
        job: req.body.job,
    }).then((resp) => {
        res.status(200).send({
            resp
        });
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.updateCron = (req, res) => {
    Cron.update({
        name: req.body.name,
        job: req.body.job,
        active: req.body.active
        },
        {where: {id: req.body.id}}
    ).then(() => {
        res.status(200).send('Параметры обновлены!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.delete = (req, res) => {
    const id = req.body.id;
    Cron.destroy({
        where: {id: id}
    }).then(() => {
        res.status(200).send('CronJob has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};