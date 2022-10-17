const { body, query, param } = require('express-validator')
const utils = require('../utils/index')
const services = require("../services/index")
const dal = require("../dal/index")
const userValidator = {
    validateCreateUser() {
        return [
            body('ad')
                .notEmpty({ ignore_whitespace: true }).withMessage("İsim alanı boş bırakılamaz!")
                .isLength({ min: 1, max: 50 }).withMessage("İsim alanı 50 karakteri aşamaz"),
            body('soyad')
                .notEmpty({ ignore_whitespace: true }).withMessage("Soyad alanı boş bırakılamaz!")
                .isLength({ min: 1, max: 50 }).withMessage("Soyad alanı 50 karakteri aşamaz"),
            body('email').isEmail().withMessage("Email alanı email formatına uygun olmak zorunda.")
                .custom(async (value, { req }) => {
                    const result = await dal.user.findOne({ email: value })
                    if (result) throw new Error('Email Adresi Kullanımda Farklı Bir Email Adresi ile deneyin')
                    return true
                }),
            body('sifre')
                .notEmpty({ ignore_whitespace: true }).withMessage("Şifre boş bırakılamaz!")
                .isLength({ min: 8, max: 30 }).withMessage("Şifre 8 ile 30 karakter arasında olmalı"),
        ]
    },
    validateSpecialData() {
        return [
            body('tc')
                .custom(async (value, { req }) => {
                    if (utils.helpers.validateTcNumber(value) === false) {
                        throw new Error('Geçersiz TC Numarası')
                    }
                    else {
                        const result = await dal.user.findOne({ tc: value })

                        if (result) {
                            if (result.id !== req.params.userId) throw new Error('Bu TC zaten kullanılıyor TC yi kotrol ediniz')

                        }
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
        ]
    },
    validateUpdateUser() {
        return [
            body('ad')
                .notEmpty({ ignore_whitespace: true }).withMessage("İsim alanı boş bırakılamaz!")
                .isLength({ min: 1, max: 50 }).withMessage("İsim alanı 50 karakteri aşamaz"),
            body('soyad')
                .notEmpty({ ignore_whitespace: true }).withMessage("Soyad alanı boş bırakılamaz!")
                .isLength({ min: 1, max: 50 }).withMessage("Soyad alanı 50 karakteri aşamaz"),
            body('email').isEmail().withMessage("Email alanı email formatına uygun olmak zorunda.")
                .custom(async (value, { req }) => {
                    const result = await dal.user.findOne({ email: value })
                    if (result) {
                        if (result.id !== req.params.userId) throw new Error('Email Adresi Kullanımda Farklı Bir Email Adresi ile deneyin')
                    }
                    return true
                }),
        ]
    },
    validateSignIn() {
        return [
            body('email').isEmail().withMessage("Email alanı email formatına uygun olmak zorunda."),
            body('sifre')
                .notEmpty({ ignore_whitespace: true }).withMessage("Şifre boş bırakılamaz!")
                .isLength({ min: 1, max: 30 }).withMessage("Şifre 30 karakteri aşamaz"),
        ]
    },
    paramValidateId() {
        return [param('userId').isMongoId().withMessage("Geçerli Bir Id değil!")]
    }

}

module.exports = userValidator

// body('tcNumber').isNumeric().isLength({ min: 11, max: 11 })
// .custom(async (value, { req }) => {
//     if (utils.helpers.validateTcNumber(value) === false) {
//         throw new Error('Geçersiz TC Numarası')
//     }
//     return true
// }),


            // .custom(async(value, { req }) => {
            //     if (utils.helpers.validateTcNumber(value) === false) {
            //         throw new Error('Geçersiz TC Numarası')
            //     }
            //     return true
            // }),