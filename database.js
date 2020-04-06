const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');


const sequelize = new Sequelize('webhistory', 'postgres', 'PASSWORD', {
    host: 'localhost',
    dialect: 'postgres'
});

const models = requireModels(sequelize, `${__dirname}/src/models`);

// sequelize.sync({force: true});
// sequelize.sync();

module.exports = { sequelize, models }
