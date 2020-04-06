const Sequelize = require('sequelize');

function defineImage(database) {
    const Image = database.define(
        'images',
        {
            owner: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );


    return Image;
}

module.exports = defineImage;