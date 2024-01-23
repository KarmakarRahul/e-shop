const express = require('express')
const router = express.Router()
const authController = require('./controllers/authController.js')
const productController = require('./controllers/productController.js')
router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)
router.get('/products', productController.get)
router.post('/products', productController.add)
module.exports = router
