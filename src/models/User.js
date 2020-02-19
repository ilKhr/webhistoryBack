const Sequelize = require('sequelize');

function defineUser(database) {
    const User = database.define(
        'users',
        {
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            lastname: {
                type: Sequelize.STRING,
                alowNull: false,
                field: 'last_name',
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
    // User.sync({ alter: true });

    return User;
}

module.exports = defineUser;
