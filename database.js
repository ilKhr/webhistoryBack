const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        multipleStatements: true,
    },
    logging: false,
});

const models = requireModels(sequelize, `${__dirname}/src/models`);

models.Exhibit.hasMany(models.Image, {
    as: "exh_img",
    sourceKey: 'uid',
    foreignKey: "owner",
    hooks: true,
    onDelete: "cascade",
    onUpdate: "cascade"
});

models.Image.belongsTo(models.Exhibit,{
    foreignKey: 'owner'
});
// sequelize.sync({force: true});
sequelize.sync();

module.exports = {sequelize, models}
