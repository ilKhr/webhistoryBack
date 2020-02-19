const Sequelize = require('sequelize');

function defineRole(database) {
    const Role = database.define(
        'roles',
        {
            roleName : {
                type: Sequelize.STRING,
                unique: true,
                alowNull: false,
                field: 'role_name'
            },
            
            roleId: {
                type: Sequelize.SMALLINT,
                unique: true,
                alowNull: false,
                field: 'role_id'
            },
        },
        {
            timestamps: false,
        }
    );
    // Role.sync();

    return Role;
}

module.exports = defineRole;
