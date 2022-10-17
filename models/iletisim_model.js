const mongoose= require("mongoose")

const Schema=mongoose.Schema

const iletisimSchema=new Schema({
    email:{
        type:Schema.Types.String,
    },
    mesaj:{
        type:Schema.Types.String,
    },
},{
    minimize:true,
    timestamps:true,
    autoIndex:true
})

const Iletisim = mongoose.model("Iletisim",iletisimSchema,"iletisim")

module.exports=Iletisim