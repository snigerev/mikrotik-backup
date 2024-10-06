const db = require('../config/db.config.js');
const Instance = db.instance


exports.findAll = (req, res) => {
    Instance.findAll().then(instances => {
        res.send(instances);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.getActive = async () => {
    await Instance.findAll({where: {active: true}}).then((resp) => {
        return resp
    })
}

exports.getInstance = (req, res) => {
    Instance.findOne({where: {id: req.body.id}}).then((resp) => {
        res.status(200).send(resp)
    })
};

exports.createInstance = (req, res) => {
    Instance.create({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
        address: req.body.address,
        sshport: req.body.sshport,
        group: req.body.group
    }).then((resp) => {
        res.status(200).send({
            resp
        });
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.updateInstance = (req, res) => {
    Instance.update({
        name: req.body.name,
        login: req.body.login,
        active: req.body.active,
        password: req.body.password,
        address: req.body.address,
        sshport: req.body.sshport,
        group: req.body.group
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
    Instance.destroy({
        where: {id: id}
    }).then(() => {
        res.status(200).send('Instance has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};