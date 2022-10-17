const Yazar = require('../models/yazar_model')
const YazarDataAccess = {
    async create(yazarModel) {
        return await yazarModel.save()
    },
    async updateById(id, body) {
        return await Yazar.findByIdAndUpdate({ _id: id }, body)
    },
    async find() {
        return await Yazar.find()
    },
    async listAll(where = {}, populate) {
        return await Yazar.find(where).select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await Yazar.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async deleteById(id) {
        return await Yazar.findByIdAndDelete({ _id: id })
    },
    async findById(id) {
        return await Yazar.findById({ _id: id }) 
    },
    async findOne(where) {
        return await Yazar.findOne(where)
    },
    async findOnePopulate(where, populate) {
        return await Yazar.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await Yazar.deleteMany(where)
    }
}


module.exports = YazarDataAccess