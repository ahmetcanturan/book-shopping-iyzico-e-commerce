const yazarValidator = require("./yazar_validator")
const kitapValidator = require("./kitap_validator")
const yayineviValidator = require("./yayinevi_validator")
const userValidator = require("./user_validator")
const adresValidator = require("./adres_validator")
const kategoriValidator = require("./kategori_validator")
const sepetValidator = require("./sepet_validator")
const satinAlValidator = require("./satin_al_validator")
module.exports = {
    yazar: yazarValidator,
    kitap: kitapValidator,
    yayinevi: yayineviValidator,
    user: userValidator,
    adres: adresValidator,
    kategori: kategoriValidator,
    sepet: sepetValidator,
    satinAl: satinAlValidator
}

//? npm install --save express-validator