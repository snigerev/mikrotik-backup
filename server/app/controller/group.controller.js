const db = require('../config/db.config.js');
const Group = db.group


exports.findAll = (req, res) => {
    Group.findAll().then(cron => {
        res.send(cron);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};


exports.getGroup = (req, res) => {
    Group.findOne({where: {id: req.body.id}}).then((resp) => {
        res.status(200).send(resp)
    })
};

exports.createGroup = (req, res) => {
    Group.create({
        name: req.body.name,
    }).then((resp) => {
        res.status(200).send({
            resp
        });
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.createGroupFromInit = (req, res) => {
    Group.create({
        name: req.body.name,
        default: req.body.default
    })
};

exports.updateGroup = (req, res) => {
    Group.update({
        name: req.body.name
        },
        {where: {id: req.body.id}}
    ).then(() => {
        res.status(200).send('Group is updated!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.delete = (req, res) => {
    Group.destroy({
        where: {id: req.body.id}
    }).then(() => {
        res.status(200).send('Group has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};