const { body, query, param } = require('express-validator')
const dal = require("../dal/index")
exports.userSepetValidator = () => {
    return [
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
        body("kitap")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Kitap Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.kitap.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Kitap Idsi girdiniz:', value)
                }
                return true
            }),
    ]
}

exports.userSepetparamsIdValidator = () => {
    return [
        param("sepetId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.userSepet.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir User Sepet Idsi girdiniz:', value)
                }
                return true
            }),
    ]
}


exports.sessionSepetValidator = () => {
    return [
        body("kitap")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Kitap Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.kitap.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Kitap Idsi girdiniz:', value)
                }
                return true
            }),
    ]
}
exports.sessionSepetAddBookValidator = () => {
    return [
        query("kitapId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Kitap Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.kitap.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Kitap Idsi girdiniz:', value)
                }
                return true
            }),
    ]
}
exports.SepetDeleteBookValidator = () => {
    return [
        param("kitapId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Kitap Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.kitap.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Kitap Idsi girdiniz:', value)
                }
                return true
            }),
    ]
}


exports.sessionSepetparamsIdValidator = () => {
    return [
        param("sessionSepetId")
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
exports.userSepetAddBookValidator = () => {
    return [
        query("sepetId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.userSepet.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir UserSepet Idsi girdiniz:', value)
                }
                return true
            }),
        query("kitapId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Kitap Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.kitap.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Kitap Idsi girdiniz:', value)
                }
                return true
            }),
    ]
}