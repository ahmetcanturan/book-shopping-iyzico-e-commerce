const User = require("../models/user_model")
const UserDataAccess = {
    async create(userModel) {
        return await userModel.save()
        
    },
    async updateById(id, body) {
        return await User.findByIdAndUpdate({ _id: id }, body)
    },
    async find() {
        return await User.find()
    },
    async listAll(where = {}, populate) {
        return await User.find(where).select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async listAllWithPagination(where = {}, populate, limit, skip, sort) {
        return await User.find(where)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .select('_id name surname birthDate gender salary tcNumber email avatar cvFile country city title company').populate(populate)
    },
    async deleteById(id) {
        return await User.findByIdAndDelete({ _id: id })
    },
    async findById(id) {
        return await User.findById({ _id: id })
    },
    async findByUserWithAdes(id) { //? DB oluşturulurken idlerin referanslı olması gerekir
        try {
            return await Kitap.find({ _id: id }).populate({
                path:"adres",
            })
        } catch (error) {
            return {status:false}
        }
        
    },
    async findOne(where) {
        return await User.findOne(where)
    },
    async findOnePopulate(where, populate) {
        return await User.findOne(where).populate(populate)
    },
    async deleteMultiple(where) {
        return await User.deleteMany(where)
    }
}


module.exports = UserDataAccess