module.exports = (sequelize, Sequelize) => {
    const instance = sequelize.define('instance', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        laststatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        address: {
            type: Sequelize.STRING
        },
        sshport: {
            type: Sequelize.INTEGER
        },
        group: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    });

    return instance;
}