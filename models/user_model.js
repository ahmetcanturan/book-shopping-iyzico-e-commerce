const mongoose= require("mongoose")

const Schema=mongoose.Schema

const userSchema=new Schema({
    ad:{
        type:Schema.Types.String,
        required:true
    },
    soyad:{
        type:Schema.Types.String,
        required:true
    },
    email:{
        type:Schema.Types.String,
        required:true,
        unique:true
    },
    sifre:{
        type:Schema.Types.String,
        required:true
    },
    adres:[{
        type:Schema.Types.ObjectId,
        ref:"Adres"
    }],
    tc:{
        type:Schema.Types.Number,
    },
    tel:{
        type:Schema.Types.Number,
    },
    isTel:{
        type:Schema.Types.Number,
    }
},{
    minimize:true,
    timestamps:true,
    autoIndex:true
})

const User = mongoose.model("User",userSchema,"user")

module.exports=User