const Yazar = require("../models/yazar_model")
const dal = require("../dal/index")
const yazarResponse = require("../dto/yazarresponse_dto")
const logger = require("../logger/logger")
const utils = require("../utils/index")


exports.createYazar=async(req)=>{
    try {
        const {ad,tanitim}=req.body
        const yazar=await new Yazar({ad,tanitim})
        const json=await dal.yazar.create(yazar)
        return {...yazarResponse,id:json.id,ad,tanitim}
    } catch (error) {
        logger.logError(req,"POST",error)
        throw new Error(error)
    }
}

exports.getAllYazar=async()=>{
    try {
        const yazar=await dal.yazar.find()
        const json=(yazar=="")? {message:"Hiçbir Kayıt Bulunamadı."}:yazar
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        throw new Error(error)
    }
}

exports.getYazarById=async(req)=>{
    try {
        const yazar=await dal.yazar.findById(req.params.yazarId)
        const json=(yazar==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : yazar
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.updateYazarById=async(req)=>{
    try {
        const {ad,tanitim}=req.body
        console.table({ad,tanitim})
        const yazar=await dal.yazar.updateById(req.params.yazarId,{ad,tanitim})
        const json=(yazar==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kayıt Güncellendi.",id:yazar.id,ad:ad,tanitim:tanitim}
        return json
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteYazarById=async(req)=>{
    try {

        const yazar=await dal.yazar.deleteById(req.params.yazarId)
        const json=(yazar==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kayıt Başarıyla Silindi",yazar}
        return json
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        throw new Error(error)
    }
}
