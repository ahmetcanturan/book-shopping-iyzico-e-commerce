const Yazar = require('../models/yazar_model')
const Yayinevi = require('../models/yayinevi_model')
const Kategori = require("../models/kategori_model")
const User = require("../models/user_model")
const Kitap = require("../models/kitap_model")
const UserSepet = require("../models/user_sepet")
const SessionSepet = require("../models/session_sepet")

exports.kitapPush = async (kitapId, toId, modelName) => {
    try {
        let json;
        if (modelName == "Yazar") json = await Yazar.findById(toId)
        else if (modelName == "Yayinevi") json = await Yayinevi.findById(toId)
        else if (modelName == "Kategori") {
            let i = 0
            const kategori_list = toId
            kategori_list.forEach(async (element) => {
                i = i + 1
                json = await Kategori.findById(toId)
                await json.kitap.push(kitapId)
                if (kategori_list.length == i) await json.save()
            });

            return { res: `Kitap ${modelName} modeline Eklendi`, data: json }
        }
        else throw new Error("ModelName bulunamadı")
        await json.kitap.push(kitapId)
        await json.save()
        return { res: `Kitap ${modelName} modeline Eklendi`, data: json }
    } catch (error) {
        console.error("kitapPush:", error)
        throw new error(error)
    }
}

exports.kategoriPush = async (kategoriIdList, yayineviId) => {
    try {
        let compare;
        const yayinevi = await Yayinevi.findById(yayineviId)
        const kategori = yayinevi.kategori
        const idList = kategoriIdList
        idList.forEach(element => {
            compare = false
            kategori.forEach(element2 => {
                if (element == element2) compare = true
            });
            if (compare == false) { yayinevi.kategori.push(element) }
        });
        await yayinevi.save()
        return
    } catch (error) {
        console.error("kategoriPush:", error)
        throw new error(error)
    }
}

exports.adresPush = async (userId, adresId) => {
    try {
        const user = await User.findById(userId)
        user.adres.push(adresId)
        await user.save()
        return
    } catch (error) {
        console.error("AdresPush:", error)
        throw new error(error)
    }
}

exports.yorumPush = async (kitapId, yorumId) => {
    try {
        const kitap = await Kitap.findById(kitapId)
        kitap.yorum.push(yorumId)
        await kitap.save()
        return
    } catch (error) {
        console.error("KitapPush:", error)
        throw new error(error)
    }
}

exports.userSepetPush = async (sepetId, kitapId) => {
    try {
        const sepet = await UserSepet.findById(sepetId)
        sepet.kitap.push(kitapId)
        await sepet.save()
        return sepet
    } catch (error) {
        console.error("UserSepetPush:", error)
        throw new error(error)
    }
}


exports.sessionSepetPush = async (sessionId, kitapId) => {
    try {
        const sepet = await SessionSepet.findOne({ sessionId: sessionId })
        sepet.kitap.push(kitapId)
        await sepet.save()
        return sepet
    } catch (error) {
        console.error("SessionSepetPush:", error)
        throw new error(error)
    }
}
