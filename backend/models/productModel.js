const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category',
        // for now in future it may change
        type: String,
        required: true,
    },
    // Add other fields as needed
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
