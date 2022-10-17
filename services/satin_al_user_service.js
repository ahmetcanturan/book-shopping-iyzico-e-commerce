const Iyzipay = require("iyzipay")
const dal = require("../dal/index")
const logger = require("../logger/logger")
const services = require("./index")
const moment = require("moment")
moment.locale("tr")



exports.userSatis = async (req) => {
    try {
        const { sepetId, teslimatAdresId, faturaAdresId } = req.query
        const sepet = await dal.userSepet.findById(sepetId)
        const userId = sepet.userId
        const user = await dal.user.findById(userId)
        if (user?.tc == null) {
            return { status: false, message: "Özel Bilgileriniz Kayıtlı Değil (TC,TEL)" }
        }
        const teslimatAdres = await dal.adres.findById(teslimatAdresId)
        const faturaAdres = await dal.adres.findById(faturaAdresId)
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
            id: user.id,
            name: user.ad,
            surname: user.soyad,
            gsmNumber: `+90${user.tel}`,
            email: user.email,
            identityNumber: user.tc,
            lastLoginDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            registrationDate: `${moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}`,
            registrationAddress: teslimatAdres.adres,
            ip: "85.32.56.342", //? LocalHost Kabul etmeyeceğinden dolayı test için statik bir ip girdim
            city: teslimatAdres.il,
            country: teslimatAdres.ulke,
            zipCode: teslimatAdres.postaKodu
        }
        const shippingAddress = {
            contactName: user.ad,
            city: teslimatAdres.il,
            country: teslimatAdres.ulke,
            address: teslimatAdres.adres,
            zipcode: teslimatAdres.postaKodu,
        }
        const billingAddress = {
            contactName: user.ad,
            city: faturaAdres.il,
            country: faturaAdres.ulke,
            address: faturaAdres.adres,
            zipcode: faturaAdres.postaKodu,
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

