const Adres = require('../models/adres_model')
const AdresDataAccess = {
    async create(adresModel) {
        return await adresModel.save()
    },
    async updateById(id, body) {
        return await Adres.findByIdAndUpdate({ _id: id }, body)
    },
    async find(id) {
        return await Adres.find()
    },
    async findByUserId(id) {
        return await Adres.find({userId:id})
    },
    async listAll(where = {}, populate) {
        return await Adres.find(where).select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await Adres.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async deleteById(id) {
        return await Adres.findByIdAndDelete({ _id: id })
    },
    async findById(id) {
        return await Adres.findById({ _id: id })
    },
    async findOne(where) {
        return await Adres.findOne(where)
    },
    async findOnePopulate(where, populate) {
        return await Adres.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await Adres.deleteMany(where)
    }
}


module.exports = AdresDataAccess