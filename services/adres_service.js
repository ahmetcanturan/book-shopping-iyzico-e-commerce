const Adres = require("../models/adres_model")
const dal = require("../dal/index")
const yazarResponse = require("../dto/yazarresponse_dto")
const logger = require("../logger/logger")
const utils = require("../utils/index")


exports.createAdres = async (req) => {
    try {
        const { adresAdi, userId, ulke, il, ilce, adres, postaKodu } = req.body
        const adres_ = await new Adres({ adresAdi, userId, ulke, il, ilce, adres, postaKodu })
        const json = await dal.adres.create(adres_)
        await dal.push.adresPush(userId, json.id)
        return { id: json.id, AdresAdı: adresAdi, UserId: userId, Ülke: ulke, İl: il, İlçe: ilce, Adres: adres, Posta_Kodu: postaKodu }
    } catch (error) {
        logger.logError(req, "POST", error)
        throw new Error(error)
    }
}

exports.getAllAdres = async () => {
    try {
        const adres = await dal.adres.find()
        const json = (adres == "") ? { message: "Hiçbir Kayıt Bulunamadı." } : adres
        return json
    } catch (error) {
        logger.logError(req, "GET", error)
        throw new Error(error)
    }
}

exports.getAdresById = async (req) => {
    try {
        const adres = await dal.adres.findById(req.params.adresId)
        const json = (adres == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : adres
        return json
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.updateAdresById = async (req) => {
    try {
        const { adresAdi, ulke, il, ilce, adres, postaKodu } = req.body
        const adres_ = await dal.adres.updateById(req.params.adresId, { adresAdi, ulke, il, ilce, adres, postaKodu })
        const json = (adres_ == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kayıt Güncellendi.", id: req.params.adresId, AdresAdı: adresAdi, Ülke: ulke, İl: il, İlçe: ilce, Adres: adres }
        return json
    } catch (error) {
        logger.logError(req, "PUT", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteAdresById = async (req) => {
    try {

        const adres = await dal.adres.deleteById(req.params.adresId)
        const json = (adres == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kayıt Başarıyla Silindi", adres }
        await dal.pop.deleteRelational(adres.id, adres.userId, "User")
        return json
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        throw new Error(error)
    }
}
