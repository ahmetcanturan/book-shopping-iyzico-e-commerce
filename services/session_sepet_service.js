const SessionSepet = require("../models/session_sepet")
const dal = require("../dal/index")
const logger = require("../logger/logger")


exports.createSessionSepet = async (req) => {
    try {
        const { kitap } = req.body
        const sessionId = req.session.id
        const sepet = new SessionSepet({ sessionId, kitap })
        const json = await dal.sessionSepet.create(sepet)
        return json
    } catch (error) {
        logger.logError(req, "POST", error)
        console.error(error)
        throw new Error(error)
    }
}
exports.addBookSessionSepet = async (req) => {
    try {
        let { kitapId } = req.query
        const sessionId = req.session.id
        const sepet = await dal.push.sessionSepetPush(sessionId, kitapId)
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kitap Sepete Eklendi.", Kitap: kitapId, data: sepet }
        return json
    } catch (error) {
        logger.logError(req, "PUT", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getAllSessionSepet = async () => {
    try {
        const sepet = await dal.sessionSepet.find()
        const json = (sepet == "") ? { message: "Hiç bir Kayıt Bulunamadı." } : sepet
        return json
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getSessionSepetBySessionId = async (req) => {
    try {
        const sepet = await dal.sessionSepet.findOne(req.session.id)
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : sepet
        return json
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        throw new Error(error)
    }
}


exports.deleteSessionSepetBySessionId = async (req) => {
    try {
        const sepet = await dal.sessionSepet.deleteOne(req.session.id)
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kayıt Başarıyla Silindi", sepet }
        return json
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteBookFromSessionSepet = async (req) => {
    try {
        const sepet = await dal.pop.deleteRelational(req.params.kitapId, req.session.id, "SessionSepet")
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kayıt Başarıyla Silindi", sepet }
        return json
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        throw new Error(error)
    }
}

