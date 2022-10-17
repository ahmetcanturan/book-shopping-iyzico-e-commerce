const Yayinevi = require("../models/yayinevi_model")
const dal = require("../dal/index")
const logger = require("../logger/logger")


exports.createYayinevi=async(req)=>{
    try {
        let {ad}=req.body
        ad=ad.toLocaleUpperCase('TR')
        const yayinevi=await new Yayinevi({ad})
        const json=await dal.yayinevi.create(yayinevi)
        return json
    } catch (error) {
        logger.logError(req,"POST",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getAllYayinevi=async()=>{
    try {
        const yayinevi=await dal.yayinevi.find()
        const json=(yayinevi=="")? {message:"Hiçbir Kayıt Bulunamadı."}:yayinevi
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getYayineviById=async(req)=>{
    try {
        const yayinevi=await dal.yayinevi.findById(req.params.yayineviId)
        const json=(yayinevi==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : yayinevi
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.updateYayineviById=async(req)=>{
    try {
        let {ad}=req.body
        ad=ad.toLocaleUpperCase('TR')
        const yayinevi=await dal.yayinevi.updateById(req.params.yayineviId,{ad})
        const json=(yayinevi==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kayıt Güncellendi.",id:yayinevi.id,ad:ad}
        return json
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteYayineviById=async(req)=>{
    try {

        const yayinevi=await dal.yayinevi.deleteById(req.params.yayineviId)
        const json=(yayinevi==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kayıt Başarıyla Silindi",yayinevi}
        return json
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        throw new Error(error)
    }
}
