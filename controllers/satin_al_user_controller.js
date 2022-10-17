const baseResponse = require("../dto/baseresponse_dto")
const logger = require("../logger/logger")
const services = require("../services/index")
const { StatusCodes } = require("http-status-codes")
const validate_response = require("../validations/response_validator")
const Checkouts = require("../iyzico/services/methods/checkouts")
const nanoid = require("../iyzico/utils/nanoid")
const Logs = require("../iyzico/utils/logs")
const Iyzipay = require("iyzipay")


exports.userSatis = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        const { information, billingAddress, shippingAddress, buyer, basketItems } = await services.satinAlUserService.userSatis(req)
        await initializeCheckoutForm(information, billingAddress, shippingAddress, buyer, basketItems)
            .then(e => {
                if (e?.paymentPageUrl) res.redirect(e.paymentPageUrl)
                else res.json({ message: "Ödeme Başarısız", data: e })
            })
    } catch (error) {
        logger.logError(req, "POST", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.satisKontrol = async (req, res) => {
    try {
        Checkouts.getFormPayment({
            locale: Iyzipay.LOCALE.TR,
            conversationId: nanoid(),
            token: req?.body?.token
        }).then((result) => {
            Logs.logFile("13-checkout-form-payments-complete", result)
            if (result?.status == "success") res.json({ message: "Ödemeniz Başarıyla Gerçekleşti", status: "success" })
            else res.json({ message: "Bir Hata ile Karşılaşıldı", status: result?.status })
        }).catch((err) => {
            console.log(err)
            Logs.logFile("13-checkout-form-payments-complete-hata", err)
            res.json({ message: "Bir Hata ile Karşılaşıldı", status: result?.status, error: err })
        })
    } catch (error) {
        logger.logError(req, "POST", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


const initializeCheckoutForm = async (information, billingAddress, shippingAddress, buyer, basketItems) => {
    return await Checkouts.initialize({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: information.price,//? Ödeme Kırılımının Totali -> ödeyeceğimiz toplam fiyata da eşitleyebiliriz. -> Numberda olabilir.
        paidPrice: information.paidPrice, //? Ödenecek olan toplam tutar.
        currency: Iyzipay.CURRENCY.TRY, //? Para Birimi
        installment: information.installment,//? Ödemenin Kaç taksitte gerçekleşeceği ayarı
        basketId: information.basketId,//? Sepet Idsidir. Bunu biz sepet id'den gireceğiz ve iyzico da kayıtlı kalacak.
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,//? Ödeme yapan kullanıcının nasıl bir cihaz üzerinden sisteme girdiğini yazıyoruz . Requestlerden bu bilgiyi oku ve bu bilgiye göre burayı doldur.
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,//? İyziconun kendi belirlediği ödeme grupları belirtilir.SUBSCRIPTION seçseydik aydan aya aynı ödemeyi alırdı
        callbackUrl: `http://localhost:${process.env.PORT}/e-ticaret/kitap/user/satis/checkout/complete/payment`, //? Bu url https formatında olmalıdır.
        enabledInstallments: information.enabledInstallments,//? Taksit seçeneklerini biz giriyoruz
        buyer: buyer,
        shippingAddress: shippingAddress,
        billingAddress: billingAddress,
        basketItems: basketItems
    }).then((result) => {
        Logs.logFile("satislar", result)
        console.log(result)
        return result
    }).catch((err) => {
        console.log(err)
        Logs.logFile("satis_hatalari", err)
        return err
    })
}




