const Sequelize = require('sequelize');

function defineImage(database) {
    const Image = database.define(
        'images',
        {
            owner: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
    // Image.sync();


    return Image;
}

module.exports = defineImage;