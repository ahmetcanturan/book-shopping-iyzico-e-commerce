const userService = require("./user_service")
const kitapService = require("./kitap_service")
const yazarService = require("./yazar_service")
const yayineviService = require("./yayinevi_service")
const adresService = require("./adres_service")
const kategoriService = require("./kategori_service")
const fileDeleteService = require("./file_delete_service")
const fileImageService = require("./file_image_service")
const imageResize = require("./image_resize_service")
const userSepetService = require("./user_sepet_service")
const sessionSepetService = require("./session_sepet_service")
const satinAlUserService = require("./satin_al_user_service")
const satinAlSessionService = require("./satin_al_session_service")

module.exports = {
    userService,
    kitapService,
    yazarService,
    yayineviService,
    adresService,
    kategoriService,
    fileDeleteService,
    fileImageService,
    imageResize,
    userSepetService,
    sessionSepetService,
    satinAlUserService,
    satinAlSessionService
}