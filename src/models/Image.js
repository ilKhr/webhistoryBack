const Sequelize = require('sequelize');
const Exhibit = require('./Exhibit');

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
    Image.sync();


    return Image;
}

module.exports = defineImage;