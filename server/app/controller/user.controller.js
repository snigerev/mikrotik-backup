const db = require('../config/db.config.js');
const User = db.users
const Token = db.token
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const env = require("../config/env");

exports.create = (req, res) => {
    User.create({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(customer => {
        let token = jwt.sign(
            {
                id: customer.id
            },
            env.secret,
            {
                expiresIn: 86400 // expires in 24 hours
            });
        res.send({
            auth: true,
            token: token,
            user: customer
        });
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};
exports.createFromService = (req, res) => {
    User.create({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(customer => {
        let token = jwt.sign(
            {
                id: customer.id
            },
            env.secret,
            {
                expiresIn: 86400 // expires in 24 hours
            });
    })
};

exports.findAll = (req, res) => {
    User.findAll().then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.getUser = (req, res) => {
    User.findAll().then((resp) => {
        res.status(200).send({name: resp[0].name, id: resp[0].id})
    })
}

exports.login = (req, res) => {
    User.findOne({where: {name: req.body.name}}).then(customer => {
        let passwordIsValid = bcrypt.compareSync(req.body.password, customer.password);
        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            token: null,
            message: 'Не правильные логин и пароль'
        });
        let token = jwt.sign(
            {id: customer.id},
            env.secret,
            {expiresIn: 86400});
        Token.create({
            user_id: customer.id,
            token: token,
            end_time: new Date(Date.now() + 60000 * 1440)
        })
        res.send({
            auth: true,
            token: token,
            user: customer
        });
    }).catch((err) => {
        console.log(err)
        res.status(401).send({
            auth: false,
            token: null,
            message: 'Ошибка поиска в БД'
        });
    })
};

exports.update = (req, res) => {
    User.update({name: req.body.name, password: bcrypt.hashSync(req.body.password, 8)},
        {where: {id: req.params.userId}}
    ).then(() => {
        res.status(200).send('Пароль успешно обновлен');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
        where: {id: id}
    }).then(() => {
        res.status(200).send('Customer has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

exports.checkToken = (req, res) => {
    User.findOne({where: {name: req.body.name}}).then((user) => {
        Token.findOne({where: {user_id: user.id, token: req.body.token}}).then((token) => {
            if (token.end_time < Date.now()) {
                Token.destroy({where: {id: token.id}})
                res.send({status: 403, message: 'Время ожидания прошло. Повторите авторизацию'})
            } else {
                Token.update(
                    {end_time: new Date(Date.now() + 60000 * 1440)},
                    {
                        where: {id: token.id}
                    })
                res.send({status: 200, message: ''})
            }
        }).catch(() => {
            Token.destroy({where: {user_id: user.id}})
            res.send({status: 403, message: 'Время ожидания прошло. Повторите авторизацию'})
        })
    }).catch(() => {
        res.send({status: 403, message: 'Пользователя не существует'})
    })
}

exports.deleteToken = (req, res) => {
    Token.destroy({where: {token: req.body.token}}).then(() => {
        res.send()
    })
}
