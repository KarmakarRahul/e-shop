const ProductModel = require('../models/productModel.js')
class ProductService {
    async addProduct(productData) {
        try {
            // additional verification and other things can be added here
            const newProduct = await ProductModel.create(productData)

            return newProduct
        } catch (error) {
            console.error('Error adding product in service:', error)
            throw error // Propagate the error to the controller
        }
    }
    async getProducts(page, pageSize, categoryFilter) {
        try {
            const query = categoryFilter ? { category: categoryFilter } : {}
            const totalCount = await ProductModel.countDocuments(query)
            const products = await ProductModel.find(query)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec()

            const totalPages = Math.ceil(totalCount / pageSize)

            return {
                products,
                pagination: {
                    page,
                    pageSize,
                    totalCount,
                    totalPages,
                },
            }
        } catch (error) {
            console.error('Error fetching products in service:', error)
            throw error
        }
    }
}

module.exports = new ProductService()
