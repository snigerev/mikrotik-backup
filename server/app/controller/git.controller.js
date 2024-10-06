const db = require('../config/db.config.js');
const Git = db.git


exports.getGit = (req, res) => {
    Git.findOne().then((resp) => {
        res.status(200).send(resp)
    })
};

exports.updateGit = async (req, res) => {
    if(req.body.id != undefined) {
        await Git.update({
            username: req.body.username,
            password: req.body.password,
            url: req.body.url,
            email: req.body.email,
            fullname: req.body.fullname
        },{where: {id: req.body.id}}).then(() => {
            res.status(200).send('Git parameters update')
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        });
    } else {
        await Git.create({
            username: req.body.username,
            password: req.body.password,
            url: req.body.url,
            email: req.body.email,
            fullname: req.body.fullname
        },{where: {id: req.body.id}}).then(() => {
            res.status(200).send('Git parameters update')
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        });
    };
};