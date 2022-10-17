const UserSepet = require('../models/user_sepet')
const UserSepetDataAccess = {
    async create(userSepetModel) {
        return await userSepetModel.save()
    },
    async updateById(id, body) {
        return await UserSepet.findByIdAndUpdate({ _id: id }, body)
    },
    async find() {
        return await UserSepet.find()
    },
    async listAll(where = {}, populate) {
        return await UserSepet.find(where).select('_id').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await UserSepet.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id').populate(populate)
    },
    async deleteById(id) {
        return await UserSepet.findByIdAndDelete({ _id: id })
    },
    async findById(id) {
        return await UserSepet.findById({ _id: id })
    },
    async findOne(where) {
        return await UserSepet.findOne(where)
    },
    async findOnePopulate(where, populate) {
        return await UserSepet.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await UserSepet.deleteMany(where)
    }
}


module.exports = UserSepetDataAccess