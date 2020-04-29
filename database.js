const Sequelize = require('sequelize');
const requireModels = require('sequelize-require-models');


console.log(process.env)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('---------------------------Connection has been established successfully');
    })
    .catch(err => {
        console.error('?????????????????????????Unable to connect to the database:', err);
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
