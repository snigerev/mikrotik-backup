module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        },
    });

    return user;
}