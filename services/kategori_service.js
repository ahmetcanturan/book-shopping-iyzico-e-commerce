const Kategori = require("../models/kategori_model")
const dal = require("../dal/index")
const logger = require("../logger/logger")


exports.createKategori=async(req)=>{
    try {
        let {ad}=req.body
        ad=ad.toLocaleUpperCase('TR')
        const kategori=await new Kategori({ad})
        const json=await dal.kategori.create(kategori)
        return json
    } catch (error) {
        logger.logError(req,"POST",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getAllKategori=async()=>{
    try {
        const kategori=await dal.kategori.find()
        const json=(kategori=="")? {message:"Hiçbir Kayıt Bulunamadı."}:kategori
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getKategoriById=async(req)=>{
    try {
        const kategori=await dal.kategori.findById(req.params.kategoriId)
        const json=(kategori==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : kategori
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.updateKategoriById=async(req)=>{
    try {
        let {ad}=req.body
        ad=ad.toLocaleUpperCase('TR')
        const kategori=await dal.kategori.updateById(req.params.kategoriId,{ad})
        const json=(kategori==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kayıt Güncellendi.",id:kategori.id,ad:ad}
        return json
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteKategoriById=async(req)=>{
    try {

        const kategori=await dal.kategori.deleteById(req.params.kategoriId)
        const json=(kategori==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kayıt Başarıyla Silindi",kategori}
        return json
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        throw new Error(error)
    }
}
