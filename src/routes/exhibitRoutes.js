const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const upload = require('../../multerConfig').array("multipleImage", 3);
const {models} = require('../../database');

async function deleteErrorImage(res, sendDataFiles) {
        sendDataFiles.forEach(file => {
            fs.unlink( res.app.get('root') + `/public/images/${file.name}`,
                function (err) {
                    if (err) throw err;
                });
        })
}

async function findAndCountExhibit(limit, offset, categories) {
    if (categories){
        return models.Exhibit.findAndCountAll({
            where: {categories:categories},
            distinct: true,
            include: [{
                model: models.Image,
                as: "exh_img"
            }],
            order: [
                ['name', 'ASC']
            ],
            offset, limit
        });

    }else{
        return models.Exhibit.findAndCountAll({
        distinct: true,
        include: [{
            model: models.Image,
            as: "exh_img"
        }],
        order: [
            ['name', 'ASC']
        ],
        offset, limit
    });
    }
}

function parseImageName(array, path) {
    const images = []
    array.forEach(photo => {
        images.push(path + photo.name)
    })
    return images
}

function checkPages(countMaxPages, offset) {
    if (countMaxPages < offset || countMaxPages < 0) {
        const err = {
            err: new Error("Oops, превышен лимит страниц:)"),
            status: 404,
            code: "Page undefined"
        };
        if (err) {
            throw err
        }
    }

}

function getData(data, res) {
    if (Array.isArray(data))
        return (data.map(item => {
                return ({
                    uid: item.uid,
                    name: item.name,
                    description: item.description,
                    categories: item.categories,
                    image: parseImageName(item.exh_img, 'images/')
                })
            })
        )
    return {
        uid: data.uid,
        name: data.name, description: data.description,
        categories: data.categories,
        image: parseImageName(data.exh_img, 'images/')
    }
}


router.get(`/`, async (req, res) => {
        let {limit}  = req.query;
        const{offset, categories} = req.query;
        if (limit > 10)
            limit = 10;
        try {
            const {count, rows: result} = await findAndCountExhibit(limit, offset, categories);

            const countMaxPages = Math.round(count / limit);
            checkPages(countMaxPages, offset);
            const responseData = getData(result, res);

            res.json({
                ok: true,
                count,
                countMaxPages,
                responseData
            });
        } catch
            (error) {
            res.json({
                ok: false,
                error,
            });
            console.log(error)
        }
    }
);



router.delete('/:uid', async (req, res) => {
    const {uid} = req.params;
    try {
        const result = await models.Exhibit.findOne({
            where: {uid: uid},
            include: [{
                model: models.Image,
                uid,
                as: "exh_img"

            }]


        });

        const isDestroy = await (async function () {
            if (result.exh_img) {
                deleteErrorImage(res, result.exh_img)
                await models.Image.destroy({where: {owner: uid}})
                 return await models.Exhibit.destroy({where: {uid: uid}})
            }
            return 0

        })();

        if (isDestroy)
            res.json({
                ok: true,
                isDestroy,
            });

    } catch (error) {
        res.json({
            ok: false,
            error,
            message:'Exhibit not exist'
        });
    }
});

router.get('/:uid', async (req, res) => {
    const {uid} = req.params;
    try {
        const result = await models.Exhibit.findOne({
            where: {uid: uid},
            include: [{
                model: models.Image,
                as: "exh_img"
            }]
        });
        const responseData = getData(result, res);

        res.json({
            ok: true,
            responseData,
        });
    } catch (error) {
        res.json({
            ok: false,
            error,
        });
        console.log(error)
    }
});

router.post('/', (req, res) => {
    upload(req, res, async function (err) {
        //Ошибки нет
        if (!err) {
            try {
                const files = req.files;
                const {uid, name, description, categories} = req.body;
                const sendDataFiles = [];

                for (const file of files) {
                    sendDataFiles.push({owner: +uid, name: file.filename})
                }
                try{
                    await models.Exhibit.create({
                    uid,
                    name,
                    description,
                    categories
                });
                }
                catch(error){
                    await deleteErrorImage(res, sendDataFiles)
                    throw error
                }

                models.Image.bulkCreate(sendDataFiles);
                res.json({
                    ok: true,
                });


            } catch
                (error) {

                res.json({
                    ok: false,
                    error,
                });

            }
        } else if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({
                    ok: false,
                    message: "File too large"
                })
            } else if (err.code === "LIMIT_FILE_COUNT") {
                res.json({
                    ok: false,
                    message: "Too many files"
                })

            }
        } else if (err) {
            res.json({
                ok: false,
                message: "Тип файла не подходит"
            })
        }

    })
})
;


module.exports = router;


