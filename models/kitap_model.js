const mongoose= require("mongoose")

const Schema=mongoose.Schema

const kitapSchema=new Schema({
    ad:{
        type:Schema.Types.String,
        required:true
    },
    tanitim:{
        type:Schema.Types.String,
        required:true
    },
    yazar:{
        type:Schema.Types.ObjectId,
        ref:"Yazar"
    },
    yayinevi:{
        type:Schema.Types.ObjectId,
        ref:"Yayinevi"
    },
    yayinTarihi:{
        type:Schema.Types.String,
        required:true
    },
    cevirmen:{
        type:Schema.Types.String,
    },
    kategori:[{
        type:Schema.Types.ObjectId,
        ref:"Kategori"
    }],
    isbn:{
        type:Schema.Types.Number,
        required:true
    },
    dil:{
        type:Schema.Types.String,
        required:true
    },
    sayfa:{
        type:Schema.Types.Number,
        required:true
    },
    image:{
        type:Schema.Types.String,
        required:true
    },
    fiyat:{
        type:Schema.Types.Number,
        required:true
    },
    satis:{
        type:Schema.Types.Number,
    },
    yorum:[{
        type:Schema.Types.ObjectId,
        ref:"Yorum"
    }],
    tiklanma:{
        type:Schema.Types.Number,
    }
},{
    minimize:true,
    timestamps:true,
    autoIndex:true
})

const Kitap = mongoose.model("Kitap",kitapSchema,"kitap")

module.exports=Kitap