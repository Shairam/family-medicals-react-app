const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    },
    unit_price: {
        required: true,
        type: Number
    }
},{timestamps: true, collection: 'Medicines'})

module.exports = mongoose.model('Data', medicineSchema)