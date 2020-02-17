const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');

const database = new Sequelize('postgres://postgres:090302@localhost:5432/webhistory');
const models = requireModels(database, `${__dirname}/models`);


module.exports = { database, models };
