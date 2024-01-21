require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./route.js')
const PORT = process.env.PORT || 8080
const connectDB = require('./database.js')
//middlewares
app.use(express.json());
const corsOption = {
    origin: [process.env.FRONTEND_BASE_URL],
    Credential: true
}
app.use(cors(corsOption))
app.use('/api/v1', router);
connectDB();

app.get('/', (req, res) => {
    res.json({
        message: 'Hi👋 from e-shop backend',
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
