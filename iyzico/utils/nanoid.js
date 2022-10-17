const { customAlphabet } = require("nanoid")
//?  Rastgele id oluşturucaz
//? id yalnızca belirttiğimiz karakterleri içerebilecek ve 20 basamaklı olacak
const nanoid = customAlphabet("0123456789QAZXSWEDCVFRTGBNHYUJMKILOPqazxswedcvfrtgbnhyujmklopi", 20)

module.exports = nanoid