const mongoose = require("mongoose")

const Schema = mongoose.Schema

const sessionSepetSchema = new Schema({
    sessionId: {
        type: Schema.Types.String,
        ref: "sessions",
        unique: true,
        required: true
    },
    kitap: [{
        type: Schema.Types.ObjectId,
        ref: "Kitap",
        required: true
    }]
}, {
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const SessionSepet = mongoose.model("SessionSepet", sessionSepetSchema, "sessionSepet")

module.exports = SessionSepet