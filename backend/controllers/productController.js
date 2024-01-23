const ProductService = require('../services/productService.js')
const ProductDto = require('../dtos/productDto.js')
class ProductController {
    async get(req, res) {
        try {
            // Pagination parameters
            const page = parseInt(req.query.page) || 1
            const pageSize = parseInt(req.query.pageSize) || 2 // change it to default 10 or 50

            // Category filter
            const categoryFilter = req.query.category

            const result = await ProductService.getProducts(
                page,
                pageSize,
                categoryFilter
            )
            result.products = result.products.map(
                (product) => new ProductDto(product)
            )
            return res.json(result)
        } catch (error) {
            console.error('Error fetching products in controller:', error)
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
    async add(req, res) {
        try {
            const { product } = req.body

            // Validate the incoming product data
            if (!product || typeof product !== 'object') {
                return res.status(400).json({
                    message: 'Invalid product data',
                })
            }

            // Create the product using the ProductService
            const addedProduct = await ProductService.addProduct(product)

            return res.status(201).json({
                message: 'Product added successfully',
                product: new ProductDto(addedProduct),
            })
        } catch (error) {
            console.error('Error adding product:', error)
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            })
        }
    }
}

module.exports = new ProductController()
