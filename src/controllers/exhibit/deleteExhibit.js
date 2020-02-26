const { models } = require('../../database');

module.exports = async function deleteExhibit(req, res) {
    const { uid } = req.params;
    try {
        const result = await models.Exhibit.destroy({ where: { uid: uid } });
        if (result) {
            res.send('Complete');
        } else {
            res.status(400).send('Exhibit not exist');
        }
    } catch (error) {
        console.log('error: ', error);
        res.send('Error');
    }
};
