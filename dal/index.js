const kitapDal = require('./kitap_dal')
const adresDal = require('./adres_dal')
const kategoriDal = require('./kategori_dal')
const userDal = require('./user_dal')
const yayineviDal = require('./yayinevi_dal')
const yazarDal = require('./yazar_dal')
const pushDal = require("./push_dal")
const relationalDelete = require("./relational_delete")
const userSepetDal = require("./user_sepet_dal")
const sessionSepetDal = require("./session_sepet_dal")



module.exports = {
    kitap: kitapDal,
    adres: adresDal,
    kategori: kategoriDal,
    user: userDal,
    yayinevi: yayineviDal,
    yazar: yazarDal,
    push: pushDal,
    pop: relationalDelete,
    userSepet: userSepetDal,
    sessionSepet: sessionSepetDal
}