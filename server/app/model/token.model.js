module.exports = (sequelize, Sequelize) => {

    return sequelize.define('tokens', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        end_time: {
            type: Sequelize.DATE
        }
    });
}