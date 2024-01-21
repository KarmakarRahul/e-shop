const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())

const PORT = process.env.PORT || 8080
app.get('/', (req, res) => {
    res.json({
        message: 'Hi👋 from e-shop backend',
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
