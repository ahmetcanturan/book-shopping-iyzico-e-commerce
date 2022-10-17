const Yazar = require('../models/yazar_model')
const Yayinevi = require('../models/yayinevi_model')
const Kategori = require("../models/kategori_model")
const User = require("../models/user_model")
const SessionSepet = require("../models/session_sepet")
const UserSepet = require("../models/user_sepet")
exports.deleteRelational = async (kimi, kimden, modelName) => {
    try {
        let json;
        if (modelName == "Yazar") json = await Yazar.findById(kimden)
        else if (modelName == "Yayinevi") json = await Yayinevi.findById(kimden)
        else if (modelName == "Kategori") {
            let i = 0
            const kategori_list = kimden
            kategori_list.forEach(async (element) => {
                i = i + 1;
                json = await Kategori.findById(element)
                if (json == null) return
                const arr = [...json.kitap]
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] == kimi) {
                        arr.splice(i, 1)
                    }
                }
                json.kitap = [...arr]
                if (kategori_list.length == i) await json.save()
            });
            return
        }
        else if (modelName == "User") {
            json = await User.findById(kimden)
            const arr = [...json.adres]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == kimi) {
                    arr.splice(i, 1)
                }
            }
            json.adres = [...arr]
            await json.save().then((r) => {
            })
            return
        }
        else if (modelName == "SessionSepet") {
            json = await SessionSepet.findOne({ sessionId: kimden })
            const arr = [...json.kitap]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == kimi) {
                    arr.splice(i, 1)
                }
            }
            json.kitap = [...arr]
            await json.save().then((r) => {
            })
            return json
        }
        else if (modelName == "UserSepet") {
            json = await UserSepet.findById(kimden)
            const arr = [...json.kitap]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == kimi) {
                    arr.splice(i, 1)
                }
            }
            json.kitap = [...arr]
            await json.save().then((r) => {
            })
            return json
        }
        else throw new Error("ModelName bulunamadı")
        if (json == null) return
        const arr = [...json.kitap]
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == kimi) {
                arr.splice(i, 1)
            }
        }
        json.kitap = [...arr]
        await json.save().then((r) => {
        })
    } catch (error) {
        console.error("deleteRelational:", error)
        throw new error(error)
    }
}