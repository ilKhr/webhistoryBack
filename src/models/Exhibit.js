const Sequelize = require('sequelize');


function defineExhibit(database) {
    const Exhibit = database.define(
        'exhibits',
        {
            uid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            categories: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
    Exhibit.sync();





    return Exhibit;
}

module.exports = defineExhibit;
