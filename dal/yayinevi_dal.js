const Yayinevi = require('../models/yayinevi_model')
const YayineviDataAccess = {
    async create(yayineviModel) {
        return await yayineviModel.save()
    },
    async updateById(id, body) {
        return await Yayinevi.findByIdAndUpdate({ _id: id }, body)
    },
    async listAll() {
        return await Yayinevi.find().select('_id name  createdAt updatedAt')
    },
    async deleteById(id) {
        return await Yayinevi.findByIdAndDelete({ _id: id })
    },
    async find() {
        return await Yayinevi.find()
    },
    async findOne(where) {
        return await Yayinevi.findOne(where)
    },
    async findById(id) {
        try {
            return await Yayinevi.findById({ _id: id })
        } catch (error) {
            return {status:false}
        }
    },
    async findOnePopulate(where, populate) {
        return await Yayinevi.findOne(where).populate(populate)
    },
}


module.exports = YayineviDataAccess