const { models } = require('../../database');

module.exports = async function getAllExhibits(req, res) {
    const { uid } = req.params;
    try {
        const result = await models.Exhibit.findAll();
        // console.log(result);
        res.json(result);
    } catch (error) {
        console.log('error: ', error);
        res.send('Error');
    }
};
