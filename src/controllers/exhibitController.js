const { models } = require('../database');

exports.addExhibit = async function(req, res) {
    console.log(models.Exhibit);
    const { uid, name, description, image, categories } = req.body;
    try {
        const tmp = await models.Exhibit.create({ uid, name, description, image, categories });
        console.log('save complete:', tmp);
        res.send('Complete');
    } catch (error) {
        console.log('Save error', error);
        res.send('Error');
    }
};
