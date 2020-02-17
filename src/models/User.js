const Sequelize = require('sequelize');

function defineUser(database) {
    const User = database.define(
        'users',
        {
            username: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                alowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
    // User.sync();

    return User;
}

module.exports = defineUser;
