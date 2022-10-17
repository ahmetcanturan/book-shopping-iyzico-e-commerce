const mongoose= require("mongoose")

const Schema=mongoose.Schema

const kategoriSchema=new Schema({
    ad:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    kitap:[{
        type:Schema.Types.ObjectId,
        ref:"Kitap"
    }],
},{
    minimize:true,
    timestamps:true,
    autoIndex:true
})

const Kategori = mongoose.model("Kategori",kategoriSchema,"kategori")

module.exports=Kategori