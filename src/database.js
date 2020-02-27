const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');


const database = new Sequelize(process.env.DATABASE);
const models = requireModels(database, `${__dirname}/models`);


module.exports = { database, models };
