const { body, query, param } = require('express-validator')

exports.createValidator = () => {
    return [body("ad")
        .notEmpty({ ignore_whitespace: true }).withMessage("Yazar Adı ve Soyadı boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("Ad bilgiler 35 karakteri aşamaz"),
    body("tanitim")
        .notEmpty({ ignore_whitespace: true }).withMessage("Tanıtım boş bırakılamaz!")
        .isLength({ min: 1, max: 400 }).withMessage("Tanıtım 400 karakteri aşamaz")
    ]
}

exports.paramsIdValidator = () => {
    return [
        param("yazarId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
    ]
}



