const { body, query, param } = require('express-validator')
const dal = require("../dal/index")

exports.createValidator = () => {
    return [
        body("adresAdi")
            .notEmpty({ ignore_whitespace: true }).withMessage("Adres Başlığı boş bırakılamaz!")
            .isLength({ min: 1, max: 35 }).withMessage("Adres Başlığı 35 karakteri aşamaz"),
        body("userId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.user.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir User Idsi girdiniz:', value)
                }
                return true
            }),
        body("ulke")
            .notEmpty({ ignore_whitespace: true }).withMessage("Ülke adı boş bırakılamaz!")
            .isLength({ min: 1, max: 35 }).withMessage("Ülke adı 35 karakteri aşamaz"),
        body("il")
            .notEmpty({ ignore_whitespace: true }).withMessage("İl adı boş bırakılamaz!")
            .isLength({ min: 1, max: 35 }).withMessage("İl adı 35 karakteri aşamaz"),
        body("ilce")
            .notEmpty({ ignore_whitespace: true }).withMessage("İlçe adı boş bırakılamaz!")
            .isLength({ min: 1, max: 35 }).withMessage("İlçe adı 35 karakteri aşamaz"),
        body("adres")
            .notEmpty({ ignore_whitespace: true }).withMessage("Adres alanı boş bırakılamaz!")
            .isLength({ min: 1, max: 200 }).withMessage("Adres adı 200 karakteri aşamaz"),
        body("postaKodu")
            .notEmpty({ ignore_whitespace: true }).withMessage("Posta Kodu boş bırakılamaz!")
            .isLength({ min: 5, max: 5 }).withMessage("Posta Kodu 5 basamaklı olmak zorunda")
            .custom(async (value, { req }) => {

                if (value >= 82000) {
                    throw new Error('Hatalı Bir Posta Kodu Girdiniz', value)
                }
                return true
            })
    ]
}
exports.updateValidator = () => {
    return [body("adresAdi")
        .notEmpty({ ignore_whitespace: true }).withMessage("Adres Başlığı boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("Adres Başlığı 35 karakteri aşamaz"),
    body("ulke")
        .notEmpty({ ignore_whitespace: true }).withMessage("Ülke adı boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("Ülke adı 35 karakteri aşamaz"),
    body("il")
        .notEmpty({ ignore_whitespace: true }).withMessage("İl adı boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("İl adı 35 karakteri aşamaz"),
    body("ilce")
        .notEmpty({ ignore_whitespace: true }).withMessage("İlçe adı boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("İlçe adı 35 karakteri aşamaz"),
    body("adres")
        .notEmpty({ ignore_whitespace: true }).withMessage("Adre alanı boş bırakılamaz!")
        .isLength({ min: 1, max: 200 }).withMessage("Adres adı 200 karakteri aşamaz"),
    body("postaKodu")
        .notEmpty({ ignore_whitespace: true }).withMessage("Posta Kodu boş bırakılamaz!")
        .isLength({ min: 5, max: 5 }).withMessage("Posta Kodu 5 basamaklı olmak zorunda")
    ]
}
exports.paramsIdValidator = () => {
    return [
        param("adresId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
    ]
}



