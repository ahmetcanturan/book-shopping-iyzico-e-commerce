const Kategori = require('../models/kategori_model')
const KategoriDataAccess = {
    async create(kategoriModel) {
        return await kategoriModel.save()
    },
    async updateById(id, body) {
        return await Kategori.findByIdAndUpdate({ _id: id }, body)
    },
    async find() {
        return await Kategori.find()
    },
    async listAll(where = {}, populate) {
        return await Kategori.find(where).select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await Kategori.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async deleteById(id) {
        return await Kategori.findByIdAndDelete({ _id: id })
    },
    async findById(id) {
        return await Kategori.findById({ _id: id })
    },
    async findOne(where) {
        return await Kategori.findOne(where)
    },
    async findOnePopulate(where, populate) {
        return await Kategori.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await Kategori.deleteMany(where)
    }
}


module.exports = KategoriDataAccess