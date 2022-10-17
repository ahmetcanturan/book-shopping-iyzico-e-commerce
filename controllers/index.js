const yayineviController = require("./yayinevi_controller")
const kitapController = require("./kitap_controller")
const yazarController = require("./yazar_controller")
const userController = require("./user_controller")
const adresController = require("./adres_controller")
const kategoriController = require("./kategori_controller")
const userSepetController = require("./user_sepet_controller")
const sessionSepetController = require("./session_sepet_controller")
const satinAlUserController = require("./satin_al_user_controller")
const satinAlSessionController = require("./satin_al_session_controller")
module.exports = {
    yayinevi: yayineviController,
    kitap: kitapController,
    yazar: yazarController,
    user: userController,
    adres: adresController,
    kategori: kategoriController,
    userSepet: userSepetController,
    sessionSepet: sessionSepetController,
    satinAlUser: satinAlUserController,
    satinAlSession: satinAlSessionController

}