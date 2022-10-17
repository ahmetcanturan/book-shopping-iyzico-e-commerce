const Kitap = require('../models/kitap_model')
const KitapDataAccess = {
    async create(kitapModel) {
        return await kitapModel.save()
    },

    async updateById(id, body) {
        return await Kitap.findByIdAndUpdate({ _id: id }, body)
    },
    async updateTiklanma(id) {
        return await Kitap.findByIdAndUpdate({ _id: id }, {
            $inc: { tiklanma: 1 }
        })
    },
    async listAll() {
        return await Kitap.find().select('_id name logo year description createdAt updatedAt')
    },
    async deleteById(id) {
        return await Kitap.findByIdAndDelete({ _id: id })
    },
    async find() {
        return await Kitap.find()
    },
    async findOne(where) {
        return await Kitap.findOne(where)
    },
    async findById(id) {
        try {
            return await Kitap.findById({ _id: id })
        } catch (error) {
            return {status:false}
        }
        
    },
   
    async findOnePopulate(where, populate) {
        return await Kitap.findOne(where).populate(populate)
    }
}


module.exports = KitapDataAccess