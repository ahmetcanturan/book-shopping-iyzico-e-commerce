const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSepetSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
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

const UserSepet = mongoose.model("UserSepet", userSepetSchema, "userSepet")

module.exports = UserSepet