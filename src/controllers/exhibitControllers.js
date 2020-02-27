const klawSync = require('klaw-sync');

const addExhibit = require('./exhibit/addExhibit');
const deleteExhibit = require('./exhibit/deleteExhibit');
const getAllExhibits = require('./exhibit/getAllExhibits');
const findOneExhibit = require('./exhibit/findOneExhibit');

// const exhibitControllerPath = klawSync(`${__dirname}/exhibit`, {
//     nodir: true,
//     filter: item => delete item.stats,
// });
// // const kek = require('')
// console.log('exhibitControllerPath: ', exhibitControllerPath);

module.exports = {
    deleteExhibit,
    addExhibit,
    getAllExhibits,
    findOneExhibit,
};
