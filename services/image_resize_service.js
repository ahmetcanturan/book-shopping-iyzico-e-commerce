const sharp = require("sharp")
const logger = require("../logger/logger")
const fs = require("fs")
const path = require("path")
exports.imageResize = async (req) => {
    sharp(`public/uploads/${req.file.filename}`)
        .resize(150)
        .toFile(`public/uploads/rename${req.file.filename}`, function (err) {
            if (err) {
                console.log(err)
                logger.logError(req, "POST", err)
                throw new Error("image_resize_service Hatası", err)
            }
            else {
                fs.rename(`public/uploads/rename${req.file.filename}`, `public/uploads/${req.file.filename}`, (err) => {
                    if (err) console.log("İsim Değiştirme Hatası", err)
                })
            }
        }
        );


}
