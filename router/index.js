const kitapRouter = require("./kitap_router")
const yayineviRouter = require("./yayinevi_router")
const yazarRouter = require("./yazar_router")
const kategoriRouter = require("./kategori_router")
const userRouter = require("./user_router")
const adresRouter = require("./adres_router")
const userSepetRouter = require("./user_sepet_router")
const sessionSepetRouter = require("./session_sepet_router")
const satinAlUserRouter = require("./satin_al_user_router")
const satinAlSessionRouter = require("./satin_al_session_router")
module.exports = {
    kitapRouter,
    yayineviRouter,
    yazarRouter,
    kategoriRouter,
    userRouter,
    adresRouter,
    userSepetRouter,
    sessionSepetRouter,
    satinAlUserRouter,
    satinAlSessionRouter
}