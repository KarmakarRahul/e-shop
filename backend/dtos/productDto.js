class ProductDto {
    constructor(data) {
        this.id = data._id
        this.name = data.name || ''
        this.description = data.description || ''
        this.price = data.price || 0
        this.category = data.category || ''
        // Add other fields as needed
    }
}

module.exports = ProductDto
