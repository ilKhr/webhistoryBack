const { models } = require('../../database');

module.exports = async function readExhibit(req, res) {
    const { uid } = req.params;
    console.log(uid);
    try {
        const result = await models.Exhibit.findOne({
            where: { uid: uid },
        });
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log('error: ', error);
        res.send('Error');
    }
};
