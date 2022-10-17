const multer = require('multer')
const mimeTypes = require('../consts/index')

exports.fileImageService=async(req,res)=>{
    
}
//? İndirilen dosyanın hangi klasöre indireleceğini belirtir.
const storage = multer.diskStorage({//? diskStore diske depolanacak anlamına gelir
    destination: function(req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {//? isim çakışmalarını önlemek için aşağısı yapılıyor
        const randomName = `${Date.now()}_${Math.random().toString(36)}_${file.fieldname}_${file.originalname[0]}.png`
        cb(null, randomName)
    }
})

const fileFilter = (req, file, cb) => {//?  Alacağımız dosyaların filtrelenmesi için middeleware
    if (mimeTypes.general.IMAGE_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true)
        return
    }
    return cb(({message:"Sadece image olan 'jpg','jpeg' ve 'png' formatları desteklenir!"}), false)
}
const upload = multer({ storage, fileFilter, limits: { fileSize: "5MB" } }).single('image')
module.exports = upload