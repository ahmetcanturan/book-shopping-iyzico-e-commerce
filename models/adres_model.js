const mongoose = require("mongoose")

const Schema = mongoose.Schema

const adresSchema = new Schema({
    adresAdi: {
        type: Schema.Types.String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ulke: {
        type: Schema.Types.String,
        required: true
    },
    il: {
        type: Schema.Types.String,
        required: true
    },
    ilce: {
        type: Schema.Types.String,
        required: true
    },
    adres: {
        type: Schema.Types.String,
        required: true
    },
    postaKodu: {
        type: Schema.Types.Number,
        required: true
    },
}, {
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Adres = mongoose.model("Adres", adresSchema, "adres")

module.exports = Adres