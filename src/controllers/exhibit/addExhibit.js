const { models } = require('../../database');

module.exports = async function addExhibit(req, res) {
    console.log('Body', req);
    const { uid, name, description, image, categories } = req.body;
    try {
        const result = await models.Exhibit.create({ uid, name, description, image, categories });
        console.log('save complete:', result);
        res.send('Complete');
    } catch (error) {
        console.log('Save error', error);
        res.send('Error');
    }
};
