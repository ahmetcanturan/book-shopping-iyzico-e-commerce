const mongoose= require("mongoose")

const Schema=mongoose.Schema

const yazarSchema=new Schema({
    ad:{
        type:Schema.Types.String,
        required:true
    },
    tanitim:{
        type:Schema.Types.String,
        required:true
    },
    kitap:[{
        type:Schema.Types.ObjectId,
        ref:"Kitap"
    }]
},{
    minimize:true,
    timestamps:true,
    autoIndex:true
})

const Yazar = mongoose.model("Yazar",yazarSchema,"yazar")

module.exports=Yazar