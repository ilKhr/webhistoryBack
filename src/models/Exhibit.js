const Sequelize = require('sequelize');

function defineExhibit(database) {
    const Exhibit = database.define(
        'exhibits',
        {
            uid: {
                type: Sequelize.STRING,
                alowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                alowNull: false,
            },
            image: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            categories: {
                type: Sequelize.STRING,
                alowNull: false,
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
