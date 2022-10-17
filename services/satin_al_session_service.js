const Iyzipay = require("iyzipay")
const dal = require("../dal/index")
const logger = require("../logger/logger")
const services = require("./index")
const moment = require("moment")
moment.locale("tr")



exports.sessionSatis = async (req) => {
    try {
        const { ad, soyad, tel, email, tc, adres, ulke, il, ilce, postaKodu } = req.body
        const user = { ad, soyad, tel, email, tc }
        const adresSession = { adres, ulke, il, ilce, postaKodu }
        const { sepetId } = req.query
        const sepet = await dal.sessionSepet.findById(sepetId)
        const userId = sepet.sessionId
        let sepetTutar = 0
        const basketItems = []
        for (const kitapId of sepet.kitap) {
            const kitap = await dal.kitap.findById(kitapId)
            sepetTutar = sepetTutar + kitap.fiyat
            basketItems.push({
                id: String(kitapId),
                name: kitap.ad,
                category1: "Kitaplar",
                category2: "Kitap",
                price: kitap.fiyat,
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
            })
        }
        const buyer = {
            id: userId,
            name: user.ad,
            surname: user.soyad,
            gsmNumber: `+90${user.tel}`,
            email: user.email,
            identityNumber: user.tc,
            lastLoginDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            registrationDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            registrationAddress: adresSession.adres,
            ip: "85.32.56.342", //? LocalHost Kabul etmeyeceğinden dolayı test için statik bir ip girdim
            city: adresSession.il,
            country: adresSession.ulke,
            zipCode: adresSession.postaKodu
        }
        const shippingAddress = {
            contactName: user.ad,
            city: adresSession.il,
            country: adresSession.ulke,
            address: adresSession.adres,
            zipcode: adresSession.postaKodu,
        }
        const billingAddress = {
            contactName: user.ad,
            city: adresSession.il,
            country: adresSession.ulke,
            address: adresSession.adres,
            zipcode: adresSession.postaKodu,
        }
        const information = {
            price: sepetTutar,
            paidPrice: sepetTutar,
            installment: "1",
            basketId: sepetId,
            enabledInstallments: [1]
        }
        return { information, billingAddress, shippingAddress, buyer, basketItems }
    } catch (error) {
        logger.logError(req, "POST", error)
        console.error(error)
        throw new Error(error)
    }
}

