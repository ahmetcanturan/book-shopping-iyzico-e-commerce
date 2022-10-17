const fs = require("fs")
const path = require("path")
const { cwd } = require("node:process")
const location = cwd()
exports.logFile = (filename, data) => {
    const dir = path.join(location, `/logs/${filename}.txt`)
    if (!fs.existsSync(dir)) {
        const writeData = JSON.stringify(data, null, 4)
        fs.writeFileSync(dir, writeData)
    }
    else {
        const writeData2 = JSON.stringify(data, null, 4)
        fs.appendFileSync(dir, `\n${writeData2}`)
    }
}
