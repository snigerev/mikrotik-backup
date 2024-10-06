module.exports = (sequelize, Sequelize) => {
    const group = sequelize.define('group', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        default: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    });

    return group;
}