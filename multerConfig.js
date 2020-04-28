const multer = require('multer');

function fileFilter(req, file, cb) {

    const type = /[^.]+$/.exec(file.originalname)[0];
    if (type === "jpeg" || type === "jpg" || type === "png") {
        cb(null, true);
    } else {
        const err = {
            err: new Error("Тип файла не подходит"),
            status: 401,
            code: "TYPE_IS_NOT_DEFINED"
        };
        cb(err, false);
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + /[^.]+$/.exec(file.originalname));
    },


});

const upload = multer({storage: storage, fileFilter, limits: {fileSize: 1048576}});

module.exports = upload;
