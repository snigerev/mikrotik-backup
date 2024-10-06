module.exports = (sequelize, Sequelize) => {
    const cronjob = sequelize.define('cronjob', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        job: {
            type: Sequelize.STRING,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
    });

    return cronjob;
}