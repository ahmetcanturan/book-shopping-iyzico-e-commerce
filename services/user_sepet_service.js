const UserSepet = require("../models/user_sepet")
const dal = require("../dal/index")
const logger = require("../logger/logger")


exports.createUserSepet = async (req) => {
    try {
        let { userId, kitap } = req.body
        const sepet = new UserSepet({ userId, kitap })
        const json = await dal.userSepet.create(sepet)
        return json
    } catch (error) {
        logger.logError(req, "POST", error)
        console.error(error)
        throw new Error(error)
    }
}
exports.addBookUserSepet = async (req) => {
    try {
        let { kitapId, sepetId } = req.query
        const sepet = await dal.push.userSepetPush(sepetId, kitapId)
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kitap Sepete Eklendi.", Kitap: kitapId, data: sepet }
        return json
    } catch (error) {
        logger.logError(req, "PUT", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getAllUserSepet = async () => {
    try {
        const sepet = await dal.userSepet.find()
        const json = (sepet == "") ? { message: "Hiç bir Kayıt Bulunamadı." } : sepet
        return json
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getUserSepetById = async (req) => {
    try {
        const sepet = await dal.userSepet.findById(req.params.sepetId)
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : sepet
        return json
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        throw new Error(error)
    }
}


exports.deleteUserSepetById = async (req) => {
    try {

        const sepet = await dal.userSepet.deleteById(req.params.sepetId)
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kayıt Başarıyla Silindi", sepet }
        return json
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteBookFromUserSepet = async (req) => {
    try {
        const { sepetId, kitapId } = req.query
        const sepet = await dal.pop.deleteRelational(kitapId, sepetId, "UserSepet")
        const json = (sepet == null) ? { message: "Kayıtlı Olmayan Bir Id Girdiniz" } : { message: "Kayıt Başarıyla Silindi", sepet }
        return json
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        throw new Error(error)
    }
}