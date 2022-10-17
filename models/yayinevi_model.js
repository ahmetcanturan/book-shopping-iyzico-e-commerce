const mongoose= require("mongoose")

const Schema=mongoose.Schema

const yayineviSchema=new Schema({
    ad:{
        type:Schema.Types.String,
        required:true,
    },
    kitap:[{
        type:Schema.Types.ObjectId,
        ref:"Kitap"
    }],
    kategori:[{
        type:Schema.Types.ObjectId,
        ref:"Kategori"
    }]
},{
    minimize:true,
    timestamps:true,
    autoIndex:true
})

const Yayinevi = mongoose.model("Yayinevi",yayineviSchema,"yayinevi")

module.exports=Yayinevi