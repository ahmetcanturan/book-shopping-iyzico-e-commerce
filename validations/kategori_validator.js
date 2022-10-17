const { body, query, param } = require('express-validator')
const dal=require("../dal/index")
exports.createValidator = () => {
    return [body("ad")
        .notEmpty({ ignore_whitespace: true }).withMessage("Kategori adı boş bırakılamaz!")
        .isLength({ min: 1, max:35 }).withMessage("Kategori adı 35 karakteri aşamaz")
        .custom(async (value, { req }) => {
            let upper=value.toLocaleUpperCase('TR')
            const result = await dal.kategori.findOne({ad:upper})
            if (result) {
                throw new Error('Bu Kategori Zaten Kayıtlı')
            }
            return true
        })
    ]
}

exports.paramsIdValidator=()=>{
    return [
    param("kategoriId")
    .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
    .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
    ]
}



