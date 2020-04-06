const Sequelize = require('sequelize');
const Image = require('./Image');


function defineExhibit(database) {
    const Exhibit = database.define(
        'exhibits',
        {
            uid: {
                type: Sequelize.STRING,
                alowNull: false,
                unique: true,
            },
            // owner: {
            //     type: Sequelize.STRING,
            //     alowNull: false,
            // },
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
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


    // Exhibit.hasMany(Image(database), {
    //     //     sourceKey: 'uid',
    //     //     as:'images',
    //     //     foreignKey: "owner",
    //     //     onDelete: 'cascade',
    //     //     onUpdate: true,
    //     //     individualHooks: true,
    //     //     hooks: true
    //     // });
    // Exhibit.sync({force: true})
    Exhibit.hasMany(Image(database), {as:"images", sourceKey: 'uid', foreignKey: "owner", hooks: true});


    return Exhibit;
}

module.exports = defineExhibit;
