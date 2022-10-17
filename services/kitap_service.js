const Kitap = require("../models/kitap_model")
const dal = require("../dal/index")
const logger = require("../logger/logger")
const utils=require("../utils/index")


exports.createKitap=async(req)=>{
    try {
        const {ad,tanitim,yazar,yayinevi,yayinTarihi,cevirmen,kategori,isbn,dil,sayfa,fiyat}=req.body
        const kitap=await new Kitap({ad,tanitim,yazar,yayinevi,yayinTarihi,cevirmen,kategori,isbn,dil,sayfa,fiyat,image:"default.png"})
        const json=await dal.kitap.create(kitap)
        await dal.push.kitapPush(json.id,yazar,"Yazar")
        await dal.push.kitapPush(json.id,yayinevi,"Yayinevi")
        await dal.push.kitapPush(json.id,kategori,"Kategori")
        await dal.push.kategoriPush(kategori,yayinevi)
        return {id:json.id,data:json}
    } catch (error) {
        logger.logError(req,"POST",error)
        console.error(error)
        throw new Error(error)
    }
}
exports.uploadPhotoByKitapId=async(req)=>{
    try {
        if (req?.file?.filename==undefined){return {message:"Yüklenecek Fotoğrafı Seçmediniz",status:false}}
        const json=await dal.kitap.updateById(req.params.kitapId,{image:req.file.filename})
        const ip= await utils.helpers.getHost()
        const filePath=process.env.FILE_PATH
        const fileName=req.file.filename  
        const imagepath=`${ip}${filePath}${fileName}`
        return {message:"Fotoğraf Başarıyla Yüklendi",id:json.id,ad:json.ad,image:req.file.filename,url:imagepath,oldImage:json.image,status:true}
    } catch (error) {
        logger.logError(req,"POST",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getAllKitap=async()=>{
    try {
        const kitap=await dal.kitap.find()
        const json=(kitap=="")? {message:"Hiçbir Kayıt Bulunamadı."}:kitap
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.getKitapById=async(req)=>{
    try {
        const kitap=await dal.kitap.findById(req.params.kitapId)
        const json=(kitap==null)? {message:"Kayıtlı Olmayan Bir Id Girdiniz"} : kitap
        return json
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.updateKitapById=async(req)=>{
    try {
        const {ad,tanitim,yazar,yayinevi,yayinTarihi,cevirmen,kategori,isbn,dil,sayfa,fiyat}=req.body
        const kitap=await dal.kitap.updateById(req.params.kitapId,{ad,tanitim,yazar,yayinevi,yayinTarihi,cevirmen,kategori,isbn,dil,sayfa,fiyat})
        await dal.pop.deleteRelational(kitap.id,kitap.yayinevi,"Yayinevi")
        await dal.pop.deleteRelational(kitap.id,kitap.yazar,"Yazar")
        await dal.pop.deleteRelational(kitap.id,kitap.kategori,"Kategori")
        await dal.push.kitapPush(kitap.id,yazar,"Yazar")
        await dal.push.kitapPush(kitap.id,yayinevi,"Yayinevi")
        await dal.push.kitapPush(kitap.id,kategori,"Kategori")
        await dal.push.kategoriPush(kategori,yayinevi)
        return kitap
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        throw new Error(error)
    }
}

exports.deleteKitapById=async(req)=>{
    try {
        let json;
        const kitap=await dal.kitap.deleteById(req.params.kitapId)
        if(kitap==null){
            json={message:"Kayıtlı Olmayan Bir Id Girdiniz"}
        }
        else{
            json={message:"Kayıt Başarıyla Silindi",kitap}
            await dal.pop.deleteRelational(kitap.id,kitap.yayinevi,"Yayinevi")
            await dal.pop.deleteRelational(kitap.id,kitap.yazar,"Yazar")
            await dal.pop.deleteRelational(kitap.id,kitap.kategori,"Kategori")
        }
        return json
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        throw new Error(error)
    }
}
