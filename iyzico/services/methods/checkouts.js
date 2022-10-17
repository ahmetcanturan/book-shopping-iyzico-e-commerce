//? Check Out Formu ile Ödeme Sistemi
//? Bu sistemde iyzico kendi ödeme ekranlarını verir 
//? Kullanıcı isterse normal öder isterse 3D Secure ile öder
//? Modül içerisine cardUserKeyi tanımlarsak
//? Kullanıcının kayıtlı kartları form üzerinde kullanıcıya gösterilir.
const iyzipay = require("../connection/iyzipay")

//? Ödemeyi Başlatan Method
exports.initialize = async (data) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutFormInitialize.create(data, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

//? Ödemeyi Tamamlayan Method
exports.getFormPayment = async (data) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutForm.retrieve(data, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}