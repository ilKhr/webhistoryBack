const Sequelize = require('sequelize');


function defineUser(database) {
    const User = database.define(
        'users',
        {
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                alowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            role: {
                type: Sequelize.SMALLINT,
                defaultValue: 2,
            },
        },
        {
            timestamps: true,
        },
    );
    // User.hasMany(Exhibit(database), {as: 'kek', foreignKey: 'uid'});
    // User.sync({force: true});


    return User;
}


module.exports = defineUser;
