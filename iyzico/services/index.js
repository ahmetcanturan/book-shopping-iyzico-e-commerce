const Checkouts = require("./methods/checkouts")
const CancelPayments = require("./methods/cancel-payment")
const nanoid = require("../utils/nanoid")
const Logs = require("../utils/logs")
const Iyzipay = require("iyzipay")

//!-----------Check Out Formu ile Ödeme İşlemleri--------

//? Kayıtlı Olmayan Bir Kartla Ödeme
const initializeCheckoutForm = () => {
    Checkouts.initialize({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: "300",//? Ödeme Kırılımının Totali -> ödeyeceğimiz toplam fiyata da eşitleyebiliriz. -> Numberda olabilir.
        paidPrice: "300", //? Ödenecek olan toplam tutar.
        currency: Iyzipay.CURRENCY.TRY, //? Para Birimi
        installment: "1",//? Ödemenin Kaç taksitte gerçekleşeceği ayarı
        basketId: "AcB324L",//? Sepet Idsidir. Bunu biz sepet id'den gireceğiz ve iyzico da kayıtlı kalacak.
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,//? Ödeme yapan kullanıcının nasıl bir cihaz üzerinden sisteme girdiğini yazıyoruz . Requestlerden bu bilgiyi oku ve bu bilgiye göre burayı doldur.
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,//? İyziconun kendi belirlediği ödeme grupları belirtilir.SUBSCRIPTION seçseydik aydan aya aynı ödemeyi alırdı
        callbackUrl: "https://localhost/api/checkout/complete/payment", //? Bu url https formatında olmalıdır.
        enabledInstallments: [1, 2, 3, 4, 5, 6],//? Taksit seçeneklerini biz giriyoruz
        buyer: { //? Kullanıcının veritabanımızdaki bilgilerini giriyoruz
            id: "ewewe32r2343",
            name: "John",
            surname: "Doe",
            gsmNumber: "+95330000000",
            email: "email@email.com",
            identityNumber: "11471313506", //? Kullanıcının TC kimlik numarası
            lastLoginDate: "2020-10-05 12:43:35",//?Kullanıcının Son giriş yaptığı zaman Date.now()ile al moment lib ile bu formata çevir
            registrationDate: "20-10-04 12:43:35",//? Kayıt Tarihi
            registrationAddress: "Bursa Cad. Selimiye Mah. 101. Sok. No:2",//? Adres bilgileri
            ip: "85.32.56.342",//? Ödemenin yapıldığı ip
            city: "Bursa",
            country: "Turkey",
            zipCode: "16000" //? Posta Kodu       
        },
        shippingAddress: {//? Ürünün Gönderileceği Adres
            contactName: "Jhon Doe",
            city: "Bursa",
            country: "Turkey",
            address: "Bursa Cad. Selimiye Mah. 101. Sok. No:2",
            zipcode: "34732",
        },
        billingAddress: {//? Fatura Adresi
            contactName: "Jhon Doe",
            city: "Bursa",
            country: "Turkey",
            address: "Bursa Cad. Selimiye Mah. 101. Sok. No:2",
            zipcode: "34732",
        },
        basketItems: [ //? Sattığımız Ürünlerin Bilgileri
            {
                id: "dsfd314",
                name: "Samsung S20",
                category1: "Telefonlar",
                category2: "Adroid Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL, //? Satılan ürün sanal mı fiziksel mi olduğu bilgisi
                price: 150 //? Fiyatı yukarda 300 belirttiğimiz için tüm ürünlerin toplam fiyatı 300 olmalı
            },
            {
                id: "ds21456",
                name: "Iphone 11",
                category1: "Telefonlar",
                category2: "IOS Telefonlar",
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL, //? Satılan ürün sanal mı fiziksel mi olduğu bilgisi
                price: 150 //? Fiyatı yukarda 300 belirttiğimiz için tüm ürünlerin toplam fiyatı 300 olmalı
            }
        ]
    }).then((result) => {
        console.log(result)
        Logs.logFile("satislar", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("satis_hatalari", err)
    })
}
// initializeCheckoutForm() //? Html çıktısı verir

//? Checkout ödemenin tamamlanmış veya tamamlanmamış olduğunu görme
const getFormPayment = () => {//? Bilgiler iyzicodan gelecek
    Checkouts.getFormPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        token: "53beca29-5f8a-481b-add1-9844a2e773a7"
    }).then((result) => {
        console.log(result)
        Logs.logFile("13-checkout-form-payments-complete", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("13-checkout-form-payments-complete-hata", err)
    })
}
// getFormPayment()
//*-----------Check Out Formu ile Ödeme İşlemleri-END----

//!-----------Ödeme İptal İşlemleri--------
const cancelPayments = () => {
    CancelPayments.cancelPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentId: "18352365", //? ödeme çıktısında iyzico bize veriyor.
        ip: "85.23.53.224"
    }).then((result) => {
        console.log(result)
        Logs.logFile("14-cancel-payment", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("14-cancel-payment-hata", err)
    })
}
// cancelPayments()

const cancelPaymentsWithReason = () => {
    CancelPayments.cancelPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        paymentId: "18352333", //? ödeme çıktısında iyzico bize veriyor.
        ip: "85.23.53.224",
        reason: Iyzipay.REFUND_REASON.BUYER_REQUEST, //? Ödeme İptalinin sebebi belirtilir
        description: "Kullanıcı isteği ile iptal edildi.",
    }).then((result) => {
        console.log(result)
        Logs.logFile("15-cancel-payment2", result)
    }).catch((err) => {
        console.log(err)
        Logs.logFile("15-cancel-payment2-hata", err)
    })
}
// cancelPaymentsWithReason()
//*-----------Ödeme İptal İşlemleri-END----
