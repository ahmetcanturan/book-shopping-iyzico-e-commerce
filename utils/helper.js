const jwt = require("jsonwebtoken")
const fs = require("fs")
const dns = require("dns")
const os = require("os")
//? Token oluşturma
const createToken = (userId, fullName, email) => {
    const token = jwt.sign({
        userId,
        fullName,
        email
    }, process.env.SECRET_KEY, {
        issuer: "localhost",
        expiresIn: process.env.EXPIRESIN
    })
    return token
}

const verifyToken = (token) => {
    const isVerify = { decodedToken: null }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        isVerify.decodedToken = decodedToken

    } catch (error) {
        isVerify.decodedToken = null
    }
    return isVerify
}
const hashToPassword = (password) => {
    const md5 = require("md5")
    return md5(password)
}
//? Logo kayıtla ilgili
const createUploadDir = (str) => {
    if (!fs.existsSync(str)) {//? vereceğimiz dosya yoksa oluşturacak
        fs.mkdirSync(str, { recursive: true })
    }
}
//? Avatar kayıtla ilgili
const createUploadDirAvatar = (str) => {
    if (!fs.existsSync(str)) {//? vereceğimiz dosya yoksa oluşturacak
        fs.mkdirSync(str, { recursive: true })
    }
}
const getHost = () => {
    return new Promise((resolve) => {
        dns.lookup(os.hostname(), (err, ip) => {
            resolve(`http://${ip}:${process.env.PORT}`)
        })
    })
}

//? TC number validate 
const validateTcNumber = (value) => {
    value = String(value);

    // T.C. identity number should have 11 digits and first should be non-zero.
    if (!(/^[1-9]\d{10}$/).test(value)) return false;

    const digits = value.split('');
    // store last 2 digits (10th and 11th) which are actually used for validation
    const d10 = Number(digits[9]);
    const d11 = Number(digits[10]);
    // we'll also need the sum of first 10 digits for validation
    let sumOf10 = 0;
    let evens = 0;
    let odds = 0;

    digits.forEach((d, index) => {
        d = Number(d);
        if (index < 10) sumOf10 += d;
        if (index < 9) {
            if ((index + 1) % 2 === 0) {
                evens += d;
            } else {
                odds += d;
            }
        }
    });

    // check if the unit-digit of the sum of first 10 digits equals to the 11th digit.
    if (sumOf10 % 10 !== d11) return false;

    // check if unit-digit of the sum of odds * 7 and evens * 9 is equal to 10th digit.
    if (((odds * 7) + (evens * 9)) % 10 !== d10) return false;

    // check if unit-digit of the sum of odds * 8 is equal to 11th digit.
    if ((odds * 8) % 10 !== d11) return false;

    return true;
}
module.exports = {
    createToken,
    verifyToken,
    createUploadDir,
    getHost,
    hashToPassword,
    validateTcNumber,
    createUploadDirAvatar,
}