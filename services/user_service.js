const dal = require("../dal/index")
const logger = require("../logger/logger")
const utils=require("../utils/index")
const User=require("../models/user_model")

exports.signIn = async(req) => {
    try {
        const {
            email,
            sifre,
        } = req.body

        const _sifre = utils.helpers.hashToPassword(sifre)
        const json = await dal.user.findOne({ email, sifre: _sifre })
        if (json) {
            const token = utils.helpers.createToken(json._id, json.ad + "" + json.soyad, json.email)
            req.headers.authorization=token
            return { fullName: json.ad + "" + json.soyad, id: json._id, email: json.email, token }
        }
        else{return {message:"Email veya şifre Hatalı!"}}
        

    } catch (error) {
        logger.logError(req,"POST",error)
        throw new Error(error)
    }
}
exports.createUser=async(req)=>{
    try {
        const {ad,soyad,email,sifre}=req.body
        const user=await new User({ad,soyad,email,sifre:utils.helpers.hashToPassword(sifre)})
        const json=await dal.user.create(user)
        return json
    } catch (error) {
        logger.logError(req,"POST",error)
        console.error(error)
        throw new Error(error)
    }
}
exports.specialData=async(req)=>{
    try {
        const {tc,tel,isTel}=req.body
        const json=await dal.user.updateById(req.params.userId,{tc,tel,isTel})
        return json
    } catch (error) {
        logger.logError(req,"POST",error)
        console.error(error)
        throw new Error(error)
    }
}


exports.getAllUser=async()=>{
    try {
        const user=await dal.user.find()
        const json=(user=="")? {message:"Hiçbir Kayıt Bulunamadı."}:user
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getUserById=async(req)=>{
    try {
        const user=await dal.user.findById(req.params.userId)
        const json=(user==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : user
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.updateUserById=async(req)=>{
    try {
        const {ad,soyad,email}=req.body
        const user=await dal.user.updateById(req.params.userId,{ad,soyad,email})
        const json=(user==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : {message:"Kişi Güncellendi:",Ad:ad,Soyad:soyad,Email:email}
        return json
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteUserById=async(req)=>{
    try {
        let json;
        const user=await dal.user.deleteById(req.params.userId)
        if(user==null){
            json={message:"Kayıtlı Olmayan Bir Id Girdiniz"}
        }
        else{
            json={message:"Kayıt Başarıyla Silindi",user}
        }
        return json
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        throw new Error(error)
    }
}
