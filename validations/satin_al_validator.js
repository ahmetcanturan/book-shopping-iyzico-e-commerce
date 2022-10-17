const { body, query, param } = require('express-validator')
const dal = require("../dal/index")
const utils = require("../utils/index")
exports.userSatis = () => {
    return [
        query("sepetId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .custom(async (value, { req }) => {
                const result = await dal.userSepet.findById(value)
                if (!result) {
                    throw new Error('Hatalı Bir Sepet Id Girdiniz')
                }
                return true
            }),
        query("teslimatAdresId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .custom(async (value, { req }) => {
                const result = await dal.adres.findById(value)
                if (!result) {
                    throw new Error('Teslimat adresi kayıtlanmamış')
                }
                return true
            }),
        query("faturaAdresId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .custom(async (value, { req }) => {
                const result = await dal.adres.findById(value)
                if (!result) {
                    throw new Error('Fatura adresi kayıtlanmamış')
                }
                return true
            })
    ]
}

exports.sessionSatis = () => {
    return [
        body('ad')
            .notEmpty({ ignore_whitespace: true }).withMessage("İsim alanı boş bırakılamaz!")
            .isLength({ min: 1, max: 50 }).withMessage("İsim alanı 50 karakteri aşamaz"),
        body('soyad')
            .notEmpty({ ignore_whitespace: true }).withMessage("Soyad alanı boş bırakılamaz!")
            .isLength({ min: 1, max: 50 }).withMessage("Soyad alanı 50 karakteri aşamaz"),
        body('email').isEmail().withMessage("Email alanı email formatına uygun olmak zorunda."),
        body('tc')
            .custom(async (value, { req }) => {
                if (utils.helpers.validateTcNumber(value) === false) {
                    throw new Error('Geçersiz TC Numarası')
                }
                return true
            }),
        body('tel')
            .notEmpty({ ignore_whitespace: true }).withMessage("Telefon numarası alanı boş bırakılamaz!")
            .custom(async (value, { req }) => {
                var pattern = /^(5)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/
                if (!String(value).match(pattern)) { throw new Error("Telefon numarası bu şekilde olmalı: 5xxxxxxxxx") }
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
            }),
        query("sepetId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.sessionSepet.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Session Sepet Idsi girdiniz:', value)
                }
                return true
            }),

    ]
}
