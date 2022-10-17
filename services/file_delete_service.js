const fs=require("fs")

exports.fileDelete=async(path,fileName)=>{
    const rout=`${path}${fileName}`
    if(fs.existsSync(rout)){
        fs.unlink(rout,(err)=>{
                if(err) console.log(err)
                return
            })
        return
    }
}


