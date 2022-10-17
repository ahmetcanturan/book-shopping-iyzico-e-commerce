const Iyzipay = require("iyzipay")
const config = require("../config/config.json")

const iyzipay = new Iyzipay(config)

module.exports = iyzipay
