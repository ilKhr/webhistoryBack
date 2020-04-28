const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const {sequelize} = require('../../database')
const upload = require('../../multerConfig').array("multipleImage", 3);
const {models} = require('../../database');
const app = require('../../app')

async function deleteErrorImage(res, sendDataFiles) {
        sendDataFiles.forEach(file => {
            fs.unlink( res.app.get('root') + `/public/images/${file.name}`,
                function (err) {
                    if (err) throw err;
                });
        })
}

async function findAndCountExhibit(limit, offset) {
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

function parseImageName(array, path) {
    const images = []
    array.forEach(photo => {
        images.push(path + photo.name)
    })
    return images
}

function checkPages(countMaxPages, offset) {
    if (countMaxPages <= offset || countMaxPages < 0) {
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
                    name: item.name,
                    description: item.description,
                    categories: item.categories,
                    image: parseImageName(item.exh_img, res.app.get('root') + '/public/images')
                })
            })
        )
    return {
        name: data.name, description: data.description,
        categories: data.categories,
        image: parseImageName(data.exh_img, res.app.get('root') + '/public/images')
    }
}

router.get(`/`, async (req, res, next) => {
        const {limit, offset} = req.query;
        try {
            const {count, rows: result} = await findAndCountExhibit(limit, offset);
            const countMaxPages = Math.round(count / limit);
            checkPages(countMaxPages, offset);
            const responseData = getData(result, res);

            res.json({
                ok: true,
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
                const resultDestroy = await models.Exhibit.destroy({where: {uid: uid}})
                return resultDestroy
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


// НЕ РАБОТАЕТ ------------------------------------------------------->
router.put('/', async (req, res) => {
    upload(req, res, async function (err) {
        if (!err) {
            const {uid, name, description, categories} = req.body;

            const files = req.files;


            const sendDataFiles = [];

            for (const image of files) {
                // sendDataFiles.push({owner: uid, name: image.filename+"GRYA"})
                sendDataFiles.push({owner: uid, name: "lol"})

            }
            try {
                const result = await models.Exhibit.findOne({
                    where: {uid: uid},
                    include: [{
                        model: models.Image,
                        as: 'images'
                    }]
                });


                // result.images.map((image, index) => {
                //     image.name = sendDataFiles[index].name
                //
                // })

                result.set({images: [{name: "DSADSAD"}, {name: "sfdsffds"}]})
                console.log(JSON.stringify(result.images))
                if (result.images.length < sendDataFiles.length) {
                    const inputFiles = sendDataFiles.length;
                    const existFiles = result.images.length;
                    sendDataFiles.splice(0, existFiles)
                    await models.Image.bulkCreate(sendDataFiles);
                }


                if (result) {

                    const resultUpdateExhibit = await result.save()
                    // const resultUpdateExhibit = await result.update({
                    //     name,
                    //     description,
                    //     categories,
                    //     include: [{model: models.Image}]
                    // });

                    // console.log(JSON.stringify(result, null, 4))

                    if (resultUpdateExhibit) {
                        res.json({
                            ok: true,
                            resultUpdateExhibit
                        });
                    }
                } else {
                    res.json({
                        ok: false,
                        message: "И где данные?",
                    });
                }
            } catch (error) {
                res.json({
                    ok: false,
                    error,
                });
                console.log(error)
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
});
// НЕ РАБОТАЕТ ------------------------------------------------------->


//
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
                const resultCreateExhibit = await models.Exhibit.create({
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

                //TODO----------------------
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


