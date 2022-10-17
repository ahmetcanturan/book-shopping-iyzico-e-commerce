const SessionSepet = require('../models/session_sepet')
const SessionSepetDataAccess = {
    async create(sessionSepetModel) {
        return await sessionSepetModel.save()
    },
    async updateById(id, body) {
        return await SessionSepet.findByIdAndUpdate({ _id: id }, body)
    },
    async find() {
        return await SessionSepet.find()
    },
    async listAll(where = {}, populate) {
        return await SessionSepet.find(where).select('_id').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await SessionSepet.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id').populate(populate)
    },
    async deleteOne(sessionId) {
        return await SessionSepet.findOneAndDelete({ sessionId: sessionId })
    },
    async delete(sepetId) {
        console.log("girdi")
        return await SessionSepet.deleteOne({ _id: sepetId })
    },

    async findById(id) {
        return await SessionSepet.findById({ _id: id })
    },
    async findOne(sessionId) {
        return await SessionSepet.findOne({ sessionId: sessionId })
    },
    async findOnePopulate(where, populate) {
        return await SessionSepet.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await SessionSepet.deleteMany(where)
    }
}


module.exports = SessionSepetDataAccess