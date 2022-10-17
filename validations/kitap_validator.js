const { body, query, param } = require('express-validator')
const dal = require("../dal/index")
exports.createValidator = () => {
    return [body("ad")
        .notEmpty({ ignore_whitespace: true }).withMessage("Kitap adı boş bırakılamaz!")
        .isLength({ min: 1, max: 50 }).withMessage("Kitap adı 50 karakteri aşamaz"),
    body("tanitim")
        .notEmpty({ ignore_whitespace: true }).withMessage("Tanıtım boş bırakılamaz!")
        .isLength({ min: 1, max: 600 }).withMessage("Tanıtım 600 karakteri aşamaz"),
    body("yazar")
        .isMongoId().withMessage("Yazar Id'si Geçerli Bir Id formatı değildir!")
        .notEmpty({ ignore_whitespace: true }).withMessage("Yazar Id Girilmedi!")
        .custom(async (value, { req }) => {
            const result = await dal.yazar.findById(value)
            if (!result) {
                throw new Error('Eşleşmeyen Bir Yazar Idsi girdiniz:', value)
            }
            return true
        }),
    body("yayinevi")
        .isMongoId().withMessage("Yayinevi Id'si Geçerli Bir Id formatı değildir!")
        .notEmpty({ ignore_whitespace: true }).withMessage("Yayinevi Id Girilmedi!")
        .custom(async (value, { req }) => {
            const result = await dal.yayinevi.findById(value)
            if (!result) {
                throw new Error('Eşleşmeyen Bir Yayinevi Idsi girdiniz:', value)
            }
            return true
        }),
    body("yayinTarihi")
        .notEmpty({ ignore_whitespace: true }).withMessage("Yayın Tarihi boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("Kitap adı 35 karakteri aşamaz"),
    body("kategori.*") //? 1den fazla elemanı olan bir listeyi validate etmek için .* kullandık bir obje listesi olsaydı kategori.*.ilgilikey yapacaktık
        .isMongoId().withMessage("Kategori Id'si Geçerli Bir Id formatı değildir!")
        .notEmpty({ ignore_whitespace: true }).withMessage("Kategori Id Girilmedi!")
        .custom(async (value, { req }) => {
            const result = await dal.kategori.findById(value)
            if (!result) {
                throw new Error('Eşleşmeyen Bir Kategori Idsi girdiniz:', value)
            }
            return true
        }),
    body("isbn")
        .notEmpty({ ignore_whitespace: true }).withMessage("ISBN boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("ISBN 35 karakteri aşamaz"),
    body("dil")
        .notEmpty({ ignore_whitespace: true }).withMessage("Dil boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("Dil 35 karakteri aşamaz"),
    body("sayfa")
        .notEmpty({ ignore_whitespace: true }).withMessage("Sayfa Sayısı boş bırakılamaz!")
        .isLength({ min: 1, max: 10 }).withMessage("Sayfa sayısı 10 basamağı aşamaz"),
    body("fiyat")
        .isNumeric().withMessage("Fiyat alanı yalnızca rakamlar içeribilir. Virgül yerine Nokta Kullanılır.")
        .notEmpty({ ignore_whitespace: true }).withMessage("Fiyat alanı boş bırakılamaz!")
        .isLength({ min: 1, max: 35 }).withMessage("Fiyat 20 basamağı aşamaz"),
    ]
}

exports.paramsIdValidator = () => {
    return [
        param("kitapId")
            .isMongoId().withMessage("Geçerli Bir Id formatı değildir!")
            .notEmpty({ ignore_whitespace: true }).withMessage("Id Girilmedi!")
            .custom(async (value, { req }) => {
                const result = await dal.kitap.findById(value)
                if (!result) {
                    throw new Error('Eşleşmeyen Bir Id Girdiniz')
                }
                return true
            })
    ]
}

